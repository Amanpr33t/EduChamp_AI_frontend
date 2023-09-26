import { rest } from "msw";
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
                    theme: 'theme',
                    upVotes: ['abc@gmail.com']
                }]
            })
        )
    })
]