import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, Outlet, Link, useLocation } from 'react-router-dom';

// --- CONFIGURAÇÃO DA API ---
// ATENÇÃO: Substitua esta URL pela URL REAL do seu API Gateway para produtos.
// Exemplo: 'https://SEU_ID_API_GATEWAY.execute-api.us-east-1.amazonaws.com/prod'
const API_BASE_URL = 'https://a1r547ieyc.execute-api.us-east-1.amazonaws.com/v1/products'; // URL de exemplo para produtos

// src/data.js - Dados mockados para fallback e inicialização
export const mockProdutos = [
  {
    id: '1',
    nome: 'Arroz Branco Urbano 5kg',
    descricao: 'Arroz branco longo fino tipo 1, ideal para o dia a dia da família brasileira.',
    preco: 25.99,
    categoria: 'Grãos e Cereais',
    estoque: 150,
    imageUrl: 'https://images.unsplash.com/photo-1582298687355-6b45391d81b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxhcnJvenxlbnwwfDB8fHwxNzE5OTU0NTE0fDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '2',
    nome: 'Feijão Carioca Kicaldo 1kg',
    descricao: 'Feijão Carioca selecionado, cozimento rápido e saboroso.',
    preco: 8.50,
    categoria: 'Grãos e Cereais',
    estoque: 200,
    imageUrl: 'https://images.unsplash.com/photo-1594953928173-9cf6473e3e0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxmZWlqYW98ZW58MHwwfHx8MTcxOTk1NDU1OXww&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '3',
    nome: 'Leite Integral Piracanjuba 1L',
    descricao: 'Leite integral UHT, rico em cálcio e vitaminas, perfeito para toda a família.',
    preco: 4.20,
    categoria: 'Laticínios',
    estoque: 300,
    imageUrl: 'https://images.unsplash.com/photo-1628102491958-4d643a67732b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxsZWl0ZXxlbnwwfDB8fHwxNzE5OTU0NjIzfDA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '4',
    nome: 'Pão de Forma Pullman Tradicional',
    descricao: 'Pão de forma macio e fresquinho, ideal para lanches e sanduíches.',
    preco: 7.99,
    categoria: 'Padaria',
    estoque: 80,
    imageUrl: 'https://images.unsplash.com/photo-1627778531777-62627e7f67d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxwJUMzJUEzbyUyMGRlJTIwZm9ybWF8ZW58MHwwfHx8MTcxOTk1NDY1N3ww&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '5',
    nome: 'Ovos Brancos Grandes Dúzia',
    descricao: 'Ovos brancos grandes, frescos e nutritivos, essenciais para sua cozinha.',
    preco: 12.00,
    categoria: 'Hortifrúti',
    estoque: 100,
    imageUrl: 'https://images.unsplash.com/photo-1576767664654-e0c253457a44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxvdm9zfGVufDB8MHx8fDE3MTk5NTQ2ODN8MA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '6',
    nome: 'Óleo de Soja Soya 900ml',
    descricao: 'Óleo de soja refinado, ideal para frituras e preparo de alimentos.',
    preco: 6.50,
    categoria: 'Mercearia',
    estoque: 120,
    imageUrl: 'https://images.unsplash.com/photo-1626078310340-023a9d7b4b1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHZvbiUyMGVudm9sdmVkfGVufDB8MHx8fDE3MTk5NTQ3MTR8MA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '7',
    nome: 'Café Melitta Tradicional 500g',
    descricao: 'Café torrado e moído tradicional, com aroma e sabor intensos.',
    preco: 18.90,
    categoria: 'Bebidas',
    estoque: 90,
    imageUrl: 'https://images.unsplash.com/photo-1509042239634-ae327c1d7637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxjYWZlJTIwcG98ZW58MHwwfHx8MTcxOTk1NDczOHww&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '8',
    nome: 'Açúcar Refinado União 1kg',
    descricao: 'Açúcar refinado de alta qualidade, essencial para suas receitas.',
    preco: 3.80,
    categoria: 'Mercearia',
    estoque: 250,
    imageUrl: 'https://images.unsplash.com/photo-1627993072235-ef72a819b165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxhJUMzJUE3dWMlQzMlQjpyfGVufDB8MHx8fDE3MTk5NTQ3ODJ8MA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '9',
    nome: 'Biscoito Recheado Negresco 140g',
    descricao: 'Biscoito crocante com recheio cremoso de chocolate, perfeito para o lanche.',
    preco: 3.50,
    categoria: 'Biscoitos e Doces',
    estoque: 180,
    imageUrl: 'https://images.unsplash.com/photo-1626078310340-023a9d7b4b1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfGNoZXdlJTIwYm9sdWxlfGVufDB8MHx8fDE3MTk5NTQ4MTd8MA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: '10',
    nome: 'Cerveja Skol Lata 350ml',
    descricao: 'Cerveja pilsen leve e refrescante, ideal para relaxar.',
    preco: 3.00,
    categoria: 'Bebidas Alcoólicas',
    estoque: 200,
    imageUrl: 'https://images.unsplash.com/photo-1555541893-9c595089f6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM4MTN8MHwxfHNlYXJjaHwxfHxzayUyMGJvb3JzfGVufDB8MHx8fDE3MTk5NTQ4NDV8MA&ixlib=rb-4.0.3&q=80&w=400',
  },
];
