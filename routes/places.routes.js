const router = require("express").Router();
const PlaceModel = require('../models/Place.model')

router.get('/', async (req, res, next) => {
    try {
        const places = await PlaceModel.find()
        // res.render('places/list-places', { places })
        res.json(places)
    } catch (err) {
        next(err)
    }
})

router.get('/list', async (req, res, next) => {
    try {
        const places = await PlaceModel.find()
        res.render('places/list-places', { places })
        // res.json(places)
    } catch (err) {
        next(err)
    }
})


router.get('/create', (req, res, next) => {
    res.render('places/create-place')
})

router.get('/:id/update', async (req, res, next) => {
    try {
        const place = await PlaceModel.findById(req.params.id)
        res.render('places/update-place', place)
    } catch (err) {
        next(err)
    }
})

router.post('/create', (req, res, next) => {

    const { name, type, lat, lng } = req.body;
    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }
    PlaceModel.create({ name, type, location })
        .then(() => {
            res.redirect("/places/list");

        })
        .catch((err) => next(err))
})

router.post("/:id/update", (req, res, next) => {

    console.log("entra en post de udate")

    const { name, type, lat, lng } = req.body;
    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }

    PlaceModel.findByIdAndUpdate(req.params.id, { name, type, location })
        .then(() => {

            res.redirect("/places/list")
        })
        .catch((err) => next(err))

})

router.get("/:id/delete", async (req, res, next) => {

    try {
        const del = await PlaceModel.findByIdAndDelete(req.params.id);
        res.redirect("/places");
    }
    catch (err) { next(err); }


})



module.exports = router