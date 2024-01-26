import { Router, Request, Response } from "express";
const pool = require('../database/db')
const router = Router()


//get games
router.get('/', async (req: Request, res: Response) => {
try {
    const games = await pool.query("SELECT * FROM game");
    res.status(200).json(games.rows)
} catch (err) {
    res.status(500).json({message: 'Data no exit'})
}})

//get by id
router.get('/:id', async (req:Request, res:Response) => {
    try {
        const game = await pool.query(`SELECT 
        game.name, 
        game.discription,
        game.version
        FROM game 
        WHERE game.id = $1`,
         [req.params.id])
        res.status(200).json(game.rows[0])
    } catch (error) {
        res.status(500).json({message: "This id game doesn't exit"})
    }
})

//create game
router.post('/add', async (req:Request, res:Response) => {
  try {
      const {name, discription, version} = req.body
      const newGame = await pool.query("INSERT INTO game (name, discription, version) VALUES ($1, $2, $3)", 
      [name, discription, version])
    
      res.status(201).json(newGame.rows) 
  } catch (error) {
      console.log(error);
      
  }
})

//update employer
router.put('/:id', async (req:Request, res:Response) => {
    try {
        const {name, discription, version} = req.body
        const { id } = req.params

        const oldGame = await pool.query('SELECT * FROM game WHERE id = $1', [id])

        const updateGame = await pool.query(
            'UPDATE game SET name = $1, discription = $2, version = $3, update_at = NOW() WHERE id = $4 RETURNING *', 
        [name ? name : oldGame.rows[0].name,
         discription ? discription : oldGame.rows[0].discription,
          version ? version : oldGame.rows[0].version,
            id
        ])
      res.status(201).json(updateGame.rows[0])  
    } catch (error) {
        res.status(500).json({message: "Don't update"})
    }
})
//delete game
router.delete('/:id', async (req:Request, res:Response) => {
    try {
        await pool.query("DELETE FROM game WHERE id = $1", [req.params.id]);
        res.status(200).json({message: "Employer delete succesfull"})
    } catch (error) {
        res.status(500).json({message: "Don't delete"})
    }
    })
module.exports = router
