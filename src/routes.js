import { Database } from "./database.js";
import { validateTaskCreation } from "./middlewares/validateTaskCreation.js";
import { buildRoutePath } from "./utils/buildRoutePath.js";

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path:buildRoutePath('/task'),
    handler: (req,res) => {
      const { title, description } = req.body;

      const task = {
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      const verified = validateTaskCreation(task);
      
      if (!verified.valid) {
        return res.writeHead(400).end(JSON.stringify(verified.message))
      }

      const ret = database.insert('tasks',task);

      return res.writeHead(ret.statusCode).end(JSON.stringify(ret.message));
    }
  },
  {
    method: 'GET',
    path:buildRoutePath('/tasks'),
    handler: (req,res) => {
      const ret = database.getAll('tasks');

      return res.writeHead(ret.statusCode).end(JSON.stringify(ret.message));
    }
  },
  {
    method: 'DELETE',
    path:buildRoutePath('/task/:id'),
    handler: (req,res) => {

      return res.writeHead(200).end(JSON.stringify('teste'));
    }
  },
]