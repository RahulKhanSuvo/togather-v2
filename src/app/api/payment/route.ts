export async function POST(req: Request) {
    try {
        const data = await req.json()
        console.log(data)


    } catch (error) {

    }
}