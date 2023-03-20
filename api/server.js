// SUNUCUYU BU DOSYAYA KURUN

const express = require("express"); //react ta import yapmak gibi
const User = require("./users/model.js"); //model js dosyasından exportları import etmek için

const server = express();
server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newUser = await User.insert({ name, bio });
    if (!name || !bio) {
      res.status(400).json({
        message: "Lütfen kullanıcı için bir name ve bio sağlayın",
      });
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "Veritabanına kaydedilirken bir hata oluştu",
      error: err,
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kullanıcı bilgileri alınamadı", error: err });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kullanıcı bilgisi alınamadı", error: err });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.remove(id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı silinemedi", error: err });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const {id}=req.params
    let user=await User.findById(id);
    if(!user){
        res.status(404).json({message:"Belirtilen ID'li kullanıcı bulunamadı" })
    }else{
        let userUpdates=req.body;
        if(!userUpdates.name || !userUpdates.bio){
            res.status(400).json({
            message: "Lütfen kullanıcı için bir name ve bio sağlayın"})
        }else{
            let updatedUser=await User.update(id,userUpdates);
            res.json(updatedUser)
        }
    }
  } catch (error) {
    res.status(500).json({message:"Kullanıcı bilgileri güncellenemedi"})
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
