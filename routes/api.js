// Below we will use the Express Router to define a read only API endpoint
// Express will listen for API requests and respond accordingly
import express from 'express'
const router = express.Router()

// Prisma lets NodeJS communicate with MongoDB
// Let's import and initialize the Prisma client
// See also: https://www.prisma.io/docs
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Set this to match the model name in your Prisma schema
const model = 'mood'

/* ----- POST + Create------- */
//Posts the mood record to MongoDB
/* ----- POST ------- */
router.post('/mood', async (req, res) => {
  try {
    const {
      name,
      moodValue,
      exercise,
      hobby,
      meal,
      social,
      weather,
      period,
      sleepStart,
      sleepEnd,
      sleepHours,
      suggestions
    } = req.body;

    // validate required fields
    if (!name ||!moodValue) {
      console.log(err);
      res.status(500).send(err);
    }

    /* ----- CREATE ------- */
    //Create a new mood record in MongoDB
    const newMood = await prisma[model].create({
      data: {
        name: name || 'Anonymous',
        date: new Date(),
        moodValue,
        exercise: exercise || '',
        hobby: hobby || '',
        meal: meal || '',
        social: social || '',
        weather: weather || '',
        period: Boolean(period),
        sleepStart: sleepStart ? new Date(sleepStart) : new Date(),
        sleepEnd: sleepEnd ? new Date(sleepEnd) : new Date(),
        sleepHours: sleepHours ? parseFloat(sleepHours) : 0,
        suggestions: suggestions || '',
      },
    });
    //Testing
    console.log('Mood saved:', newMood);
    
    res.status(201).json(newMood);

  } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// ----- GET -------
//Wouldn't be needing this I think, the output is already on the chart (Leave it here just in case)
/*
router.get('/mood', async (req, res) => {
    try {
        // fetch first 10 records from the database with no filter
        const result = await prisma[model].findMany({
            //print most recent entries first
            orderBy: { date: 'desc' },
            take: 10
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
*/

// ----- GET | Search ------- 
//Might be useful in the future if I want to allow users to search for their past mood records
/*
router.get('/search', async (req, res) => {
    try {
        // get search term from query string; default to empty string (matches all)
        const searchTerm = req.query.terms || '';

        // fetch records from the database
        const result = await prisma[model].findMany({
            where: {
                moodValue: {
                    contains: searchTerm,
                    mode: 'insensitive'  // case-insensitive search
                }
            },
            orderBy: { date: 'desc' }, // most recent entries first
            take: 10
        });

        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
*/


// ----- GET -------
// Returning Raw records from MongoDB
// This endpoint does not use any schema. 
// This is can be useful for testing and debugging.
/*
router.get('/raw', async (req, res) => {
    try {
        // raw queries use native MongoDB query syntax
        // e.g. "limit" instead of "take"
        const options = { limit: 10 };
        const results = await prisma[model].findRaw({ options });
        res.send(results);
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})
    */


// export the api routes for use elsewhere in our app 
// (e.g. in index.js )
export default router;

