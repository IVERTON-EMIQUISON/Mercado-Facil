import React from 'react';

function Carrinho({ carrinho, onRemoverDoCarrinho, onLimparCarrinho }) {
  const [mensagemCompra, setMensagemCompra] = React.useState('');
  const total = carrinho.reduce((sum, item) => {
    const itemPreco = parseFloat(item.preco) || 0;
    const itemQuantidade = parseInt(item.quantidade) || 0;
    return sum + (itemPreco * itemQuantidade);
  }, 0);
  const handleFinalizarCompra = () => {
    setMensagemCompra('✅ Compra finalizada com sucesso!');
    setTimeout(() => {
      setMensagemCompra('');
      onLimparCarrinho();
    }, 3000);
  };

  return (
    
    <div style={styles.container}>
      <h2 style={styles.titulo}>🛒 Seu Carrinho de Compras</h2>
      {mensagemCompra && (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#d1e7dd',
        color: '#0f5132',
        padding: '20px 30px',
        borderRadius: '10px',
        border: '1px solid #badbcc',
        zIndex: 9999,
        fontSize: '18px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        {mensagemCompra}
      </div>
    )}

      {carrinho.length === 0 ? (
        <p style={styles.vazio}>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map(item => {
            const itemPreco = parseFloat(item.preco) || 0;
            const itemQuantidade = parseInt(item.quantidade) || 0;
            const subtotal = itemPreco * itemQuantidade;

            return (
              <div key={item.id} style={styles.item}>
                <div style={styles.imagemContainer}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.nome} style={styles.imagem} />
                  ) : item.imagem ? (
                    <img src={item.imagem} alt={item.nome} style={styles.imagem} />
                  ) : (
                    <div style={styles.semImagem}>Sem imagem</div>
                  )}
                </div>
                <div style={styles.info}>
                  <h3 style={styles.nome}>{item.nome}</h3>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço Unitário: R$ {itemPreco.toFixed(2)}</p>
                  <p style={styles.subtotal}>Subtotal: R$ {subtotal.toFixed(2)}</p>
                </div>
                <button onClick={() => onRemoverDoCarrinho(item.id)} style={styles.btnRemover}>
                  ❌ Remover
                </button>
              </div>
            );
          })}

          <div style={styles.total}>🧾 Total: <strong>R$ {total.toFixed(2)}</strong></div>

          <div style={styles.acoes}>
            <button onClick={onLimparCarrinho} style={styles.btnLimpar}>🧹 Limpar Carrinho</button>
            <button onClick={handleFinalizarCompra} style={styles.btnFinalizar}> ✅ Finalizar Compra </button>
          </div>
        </>
      )}
    </div>
    
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px #ccc'
  },
  titulo: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333'
  },
  vazio: {
    fontSize: '18px',
    color: '#777'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  imagemContainer: {
    width: '100px',
    height: '100px',
    marginRight: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #ddd',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagem: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  semImagem: {
    color: '#aaa',
    fontSize: '12px'
  },
  info: {
    flex: '1'
  },
  nome: {
    margin: '0 0 8px',
    color: '#222'
  },
  subtotal: {
    fontWeight: 'bold',
    color: '#1e88e5'
  },
  btnRemover: {
    marginLeft: '15px',
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  total: {
    fontSize: '20px',
    marginTop: '20px',
    backgroundColor: '#e0f7fa',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: '#00695c',
    textAlign: 'right'
  },
  acoes: {
    marginTop: '20px',
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end'
  },
  btnLimpar: {
    backgroundColor: '#ffb300',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  btnFinalizar: {
    backgroundColor: '#43a047',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

export default Carrinho;
