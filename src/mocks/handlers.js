// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
    rest.get(`${process.env.REACT_APP_BACKEND_URL}/story/get_stories`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'ok',
                count: 1,
                stories: [{
                    _id: '1',
                    prompt: 'a prompt',
                    story: 'a story',
                    theme: 'romantic',
                    upVotes: ['abc@gmail.com']
                }]
            }),
        )
    }),
    rest.get(`${process.env.REACT_APP_BACKEND_URL}/story/get_top_stories`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'ok',
                stories: [{
                    _id: '1',
                    prompt: 'a prompt',
                    story: 'a story',
                    theme: 'romantic',
                    upVotes: ['abc@gmail.com']
                }]
            }),
        )
    }),
    rest.post(`${process.env.REACT_APP_BACKEND_URL}/story/generate_story`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'ok',
                prompt: 'a prompt',
                fullStory: 'a story',
                summaryOfStory: 'a summary',
                theme: 'romantic'
            }),
        )
    }),
    rest.post(`${process.env.REACT_APP_BACKEND_URL}/story/chain_story`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                status: 'ok',
                prompt: 'a prompt',
                fullStory: 'a story',
                summaryOfStory: 'a summary',
                theme: 'romantic'
            }),
        )
    }),
    rest.post(`${process.env.REACT_APP_BACKEND_URL}/story/save_story`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({ status: 'ok', msg: 'story has been added successfully' }),
        )
    }),
]