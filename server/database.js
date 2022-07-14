import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

export class Database {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
          });

        this.db = this.client.db('jotlystDB');

        await this.init();
    }

    async init() {
        this.collection = this.db.collection('jotlystCollection');
        const count = await this.collection.countDocuments();
        if (count === 0) {
            await this.collection.insertOne(
                {
                    name: 'Jotlyst',
                    description: 'A simple todo list app',
                    priority: 'low',
                    completed: 'complete',
                });

        }
    }

    async close() {
        this.client.close();
    }

    async getAllTasks() {
        return await this.collection.find({}).toArray();
    }

    async getTask(taskName) {
        return await this.collection.findOne({ "name": taskName });
    }

    async addTask(task) {
        await this.collection.insertOne(task);
    }

    async updateTask(taskName, task) {
        await this.collection.updateOne({ "name": taskName }, { $set: task });
    }

    async deleteTask(taskName) {
        await this.collection.deleteOne({ "name": taskName });
    }

    async getAllTasksByPriority(taskPriority) {
        return await this.collection.find({ "priority": `${taskPriority}` }).toArray();
    }

    async getAllTasksByCompleted(taskCompleted) {
        return await this.collection.find({ "completed": `${taskCompleted}` }).toArray();
    }

}