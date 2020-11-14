const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const resolvers = {
  Query: {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    },
    async allUsers(root, args, { models }) {
      return models.User.findAll();
    },
    async task(root, { id }, { models }) {
      return models.Task.findByPk(id);
    },
    async allTasks(root, args, { models }) {
      return models.Task.findAll();
    },
    async allTasksForUser(root, { id }, { models }) {
      return models.Task.findAll({ where: { userId: id } });
    },
    async login(root, { userName, password }, { models }) {
      const user = await models.User.findOne({ where: { userName } });
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return { success: passwordMatch, user };
        }
      };
      return { success: false };
    }
  },

  Mutation: {
    async createUser(root, { firstName, lastName, userName, email, password }, { models }) {
      return models.User.create(
        {
          firstName,
          lastName,
          userName,
          email,
          password: await bcrypt.hash(password, 10)
        });
    },

    async createTask(root, { userId, text }, { models }) {
      return models.Task.create({ userId, text, isDone: 0 });
    },

    async toggleTaskCompletion(root, { id, isDone }, { models }) {
      const task = await models.Task.findByPk(id);
      return await task.update({ isDone })
    }
  },

  User: {
    async tasks(user) {
      return user.getTasks();
    },
  },

  Task: {
    async user(task) {
      return task.getUser();
    }
  }
}

module.exports = resolvers