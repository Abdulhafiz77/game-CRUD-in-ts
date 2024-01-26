"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pool = require('../database/db');
const router = (0, express_1.Router)();
//get games
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield pool.query("SELECT * FROM game");
        res.status(200).json(games.rows);
    }
    catch (err) {
        res.status(500).json({ message: 'Data no exit' });
    }
}));
//get by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield pool.query(`SELECT 
        game.name, 
        game.discription,
        game.version
        FROM game 
        WHERE game.id = $1`, [req.params.id]);
        res.status(200).json(game.rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: "This id game doesn't exit" });
    }
}));
//create game
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, discription, version } = req.body;
        const newGame = yield pool.query("INSERT INTO game (name, discription, version) VALUES ($1, $2, $3)", [name, discription, version]);
        res.status(201).json(newGame.rows);
    }
    catch (error) {
        console.log(error);
    }
}));
//update employer
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, discription, version } = req.body;
        const { id } = req.params;
        const oldGame = yield pool.query('SELECT * FROM game WHERE id = $1', [id]);
        const updateGame = yield pool.query('UPDATE game SET name = $1, discription = $2, version = $3, update_at = NOW() WHERE id = $4 RETURNING *', [name ? name : oldGame.rows[0].name,
            discription ? discription : oldGame.rows[0].discription,
            version ? version : oldGame.rows[0].version,
            id
        ]);
        res.status(201).json(updateGame.rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Don't update" });
    }
}));
//delete game
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query("DELETE FROM game WHERE id = $1", [req.params.id]);
        res.status(200).json({ message: "Employer delete succesfull" });
    }
    catch (error) {
        res.status(500).json({ message: "Don't delete" });
    }
}));
module.exports = router;
//# sourceMappingURL=games.js.map