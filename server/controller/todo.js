const Todo = require("../model/todo");
const moment = require('moment');

exports.addTodo = async (req, res, next) => {
    try {
        const title = req.body.title;
        const description = req.body.description
        const date = req?.body?.date ? new Date(req?.body?.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0);

        const newTodo = new Todo({
            title,
            description,
            date,
        });
        await newTodo.save();
        res.status(201).json({ message: `Todo created successfully for ${moment(date).format("DD/MM/YYYY")}` });
    } catch (error) {
        next(error)
    }
}

// exports.viewTodo = async (req, res, next) => {
//     try {
//         let query = {};
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const tomorrow = new Date(today);
//         tomorrow.setDate(today.getDate() + 1);

//         query.date = {
//             $gte: new Date(today).setHours(0, 0, 0, 0),
//             $lte: new Date(today).setHours(0, 0, 0, 0)
//         };


//         const todos = await Todo.find(query).sort({ date: -1 }).lean();

//         // const upcomingTodos = await Todo.find({date:{$gte: new Date(tomorrow).setHours(0, 0, 0, 0)}}).sort({ date: -1 }).lean();

//         res.status(200).json({ response: todos });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

exports.viewTodo = async (req, res, next) => {
    try {
        const { date } = req.query;
        let startDate, endDate;

        if (date) {
            startDate = new Date(date);
        } else {
            startDate = new Date();
        }

        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);

        const query = {
            date: {
                $gte: startDate,
                $lt: endDate,
            },
        };

        const todos = await Todo.find(query).sort({ date: -1 }).lean();

        res.status(200).json({ response: todos });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



exports.deleteTodo = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const todo = await Todo.findOne({ _id: _id });
        if (todo) {
            await Todo.deleteOne({ _id: _id });
            return res.status(200).json({ message: "Todo delete successfully." });
        } else {
            return res.status(404).json({ message: "Todo not found" });
        }
    } catch (error) {
        next(error);
    }
}


exports.updateTodo = async (req, res, next) => {
    try {
        const _id = req.params.id;

        const title = req.body.title;
        const date = req.body.date ? new Date(req.body.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0);
        const description = req.body.description;
        const isComplete = req.body.isComplete;

        const todo = await Todo.findOne({ _id: _id });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        await Todo.updateOne(
            { _id: _id },
            {
                title,
                date,
                description,
            },
            { new: true }
        );
        return res.status(200).json({ message: "Todo updated successfully." });
    } catch (error) {
        next(error);
    }
};


