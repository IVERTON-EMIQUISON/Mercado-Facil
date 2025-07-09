import React from 'react';

export default function ProductsPage() {
  const products = [
    { id: '1', name: 'Arroz Tipo 1 - 5kg', stock: 150, price: 25.99 },
    { id: '2', name: 'Feijão Carioca - 1kg', stock: 200, price: 8.5 },
    { id: '3', name: 'Óleo de Soja - 900ml', stock: 100, price: 7.2 },
    { id: '4', name: 'Leite Integral - 1L', stock: 300, price: 4.99 },
    { id: '5', name: 'Café Torrado e Moído - 500g', stock: 80, price: 12.0 },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Gestão de Produtos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Nome do Produto</th>
              <th className="py-3 px-4">Estoque</th>
              <th className="py-3 px-4">Preço (R$)</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{product.id}</td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.stock}</td>
                <td className="py-3 px-4">R$ {product.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}