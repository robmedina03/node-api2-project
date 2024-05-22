// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(() => {
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
})


router.get('/:id', (req, res) => {
    const {id} = req.params
    Posts.findById(id)
    .then(posts => {
        if(posts){
            res.status(200).json(posts)
        }else {
            res.status(404).json({message:'The post with the specified ID does not exist'})
        }
       
    })
    .catch(() => {
        res.status(500).json({message: ' The post information could not be retrived'})
    })
})

router.post('/', (req, res) => {
    const { title, contents} = req.body;
    if(!title || !contents) {
        return res.status(400).json({message: ' Please provide title and contents for the post '})
    }
    Posts.insert({title, contents})
    .then(({id}) => {
        return Posts.findById(id)
    })
    .then(post => {
        res.status(201).json(post)
    })
    .catch(() => {
        res.status(500).json({message: ' There was on error while saving the post to the database'})
    })
})


router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body
    if(!title || !contents){
        return res.status(400).json({message: 'Please provide title and contents for the post'})
    }
    Posts.findById(id)
    .then(post => {
        if(post){
            return Posts.update(id, {title, contents})
        }else {
            res.status(404).json({message: ' The post with the specified ID does not exist'})
        }
    })
    .then(updated => {
        if(updated) {
            return Posts.findById(id)
        }
    })
    .then(post => {
        res.status(200).json(post)
    })
    .catch(() => {
        res.status(500).json({message: ' The post information could not be modified'})
    })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Posts.findById(id)
    .then(post => {
        if(post) {
            return Posts.remove(id).then(() => post)
        }else {
            res.status(404).json({message: ' The post with the specified ID does not exist'})
        }
    })
    .then(deletedPost => {
        res.status(200).json(deletedPost)
    })
    .catch(() => {
        res.status(500).json({message:'The post could not be removed'})
    })
})

router.get('/:id/comments', (req, res) => {
    const {id} =req.params;
    Posts.findById(id)
    .then(post => {
        if(post){
            return Posts.findPostComments(id)
        }else{
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
    })
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(() => {
        res.status(500).json({message: ' The comments information could not be retrieved'})
    })
})
module.exports= router