import clientModel from '../models/clientModel.js'

export const getClientData = async (req, res) => {

    try {

        const clientId = req.clientId
        const client = await clientModel.findById(clientId)
        if (!client) {
            return res.json({ success: false, message: "Client Not Found" })
        }
        res.json({
            success: true,
            clientData: {
                name: client.name,
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}