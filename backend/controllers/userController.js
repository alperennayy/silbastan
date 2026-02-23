import clientModel from '../models/clientModel.js'

export const getClientData = async (req, res) => {
    try {
        const clientId = req.clientId
        const client = await clientModel.findById(clientId)

        if (!client) {
            return res.json({ success: false, message: "Müşteri bulunamadı" })
        }

        res.json({
            success: true,
            clientData: {
                name: client.name,
                email: client.email, // Profil sayfası için gerekli
                // MVP Randevu Datası (Şimdilik statik)
                appointments: [
                    { 
                        _id: 'app1', 
                        shopName: 'Be-Nice Salon', 
                        service: 'Cilt Bakımı', 
                        date: '2026-03-05', 
                        time: '14:00' 
                    },
                    { 
                        _id: 'app2', 
                        shopName: 'Be-Nice Studio', 
                        service: 'Saç Kesimi', 
                        date: '2026-03-12', 
                        time: '10:30' 
                    }
                ]
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export const updateClientData = async (req, res) => {
    try {
        const clientId = req.clientId
        const { name } = req.body

        if (!name) {
            return res.json({ success: false, message: "İsim alanı boş bırakılamaz" })
        }

        await clientModel.findByIdAndUpdate(clientId, { name })

        res.json({ success: true, message: "Profil güncellendi" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}