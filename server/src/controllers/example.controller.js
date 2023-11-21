import { Example } from "../models/Example.js";

export const getExamples = async (req, res, next) => {
    const examples = await Example.find();
    res.json(examples);
}

export const createExample = async (req, res, next) => {
    const newExample = await Example.insertOne(req.body);
    res.json(newExample);
}