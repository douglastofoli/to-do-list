const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

// Listar todas as checklists
router.get('/', async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render('checklists/index', { checklists: checklists });
  } catch (err) {
    res.status(200).render('pages/error', { err: 'Erro ao exibir as listas.' });
  }
});

// Listar checklist por ID
router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/show', { checklist: checklist });
  } catch (err) {
    res.status(200).render('pages/error', { err: 'Erro ao exibir as listas de tarefas.' });
  }
});

// Criar checklist
router.post('/', async (req, res) => {
  let { name } = req.body;

  try {
    let checklist = await Checklist.create({ name });
    res.status(200).json(checklist);
  } catch (err) {
    res.status(422).json(err);
  }
});

// Editar checklist
router.put('/:id', async (req, res) => {
  let { name } = req.body;

  try {
    let checklist = await Checklist.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.status(200).json(checklist);
  } catch (err) {
    res.status(422).json(err);
  }
});

// Deletar checklist
router.delete('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findOneAndRemove(req.params.id);
    res.status(200).json(checklist);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;