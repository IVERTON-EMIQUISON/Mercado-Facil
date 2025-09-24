import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Para mensagens de sucesso/erro
import { QRCodeCanvas } from 'qrcode.react'; // Biblioteca para gerar QR Code

function Pagamento({ onLimparCarrinho }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrinho, total } = location.state || { carrinho: [], total: 0 }; // Recebe dados do carrinho
  const API_BASE_URL = 'https://4gqf3khn5m.execute-api.us-east-1.amazonaws.com/v1'; // URL real da API
  const [metodoPagamento, setMetodoPagamento] = useState('qrcode'); // 'qrcode' ou 'cartao'
  const [cardDetails, setCardDetails] = useState({
    numeroCartao: '',
    nomeTitular: '',
    validade: '', // MM/AA
    cvc: ''
  });
  const [loading, setLoading] = useState(false);
   // --- NOVA FUNÇÃO: VERIFICA O ESTOQUE ANTES DE QUALQUER COISA ---
  const verificarEstoque = async () => {
    try {
      // Cria um array de promessas para verificar o estoque de cada item
      const verificacoes = carrinho.map(async (item) => {
        const response = await fetch(`${API_BASE_URL}/products/${item.id}`);
        if (!response.ok) {
          throw new Error(`Erro ao verificar estoque do produto ${item.nome}`);
        }
        const produtoApi = await response.json();
        
        // Retorna se o estoque é suficiente
        return {
          id: item.id,
          nome: item.nome,
          disponivel: produtoApi.estoque >= item.quantidade
        };
      });

      const resultados = await Promise.all(verificacoes);
      
      const semEstoque = resultados.find(res => !res.disponivel);

      if (semEstoque) {
        Swal.fire({
          icon: 'error',
          title: 'Estoque Insuficiente',
          text: `O produto "${semEstoque.nome}" não possui estoque suficiente.`,
        });
        return false; // Retorna false para indicar falha na verificação
      }

      return true; // Retorna true se tudo estiver OK
    } catch (error) {
      console.error('Erro na verificação de estoque:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro de conexão',
        text: 'Não foi possível verificar o estoque no momento. Tente novamente.',
      });
      return false;
    }
  };



  const atualizarEstoque = async () => {
    try {
      // Para cada item no carrinho, envie uma requisição de atualização
      const updates = carrinho.map(async (item) => {
        // Obtenha o produto para saber o estoque atual
        const responseProduto = await fetch(`${API_BASE_URL}/products/${item.id}`);
        if (!responseProduto.ok) {
          throw new Error(`Erro ao buscar produto ${item.id}`);
        }
        const produtoOriginal = await responseProduto.json();
        
        // Calcule o novo estoque
        const novoEstoque = produtoOriginal.estoque - item.quantidade;
        if (novoEstoque < 0) {
           // Lógica para lidar com estoque insuficiente (opcional, mas recomendado)
           console.error(`Estoque insuficiente para o produto: ${item.nome}`);
           return; 
        }

        const payload = { estoque: novoEstoque };

        // Envia a requisição de PUT para atualizar o estoque
        const response = await fetch(`${API_BASE_URL}/products/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Erro ao atualizar o estoque do produto ${item.nome}`);
        }
        console.log(`Estoque do produto ${item.nome} atualizado para ${novoEstoque}.`);
      });

      await Promise.all(updates); // Aguarda todas as atualizações terminarem
      console.log('Todos os estoques foram atualizados com sucesso!');

    } catch (error) {
      console.error('Erro na atualização de estoque:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro de estoque',
        text: 'Ocorreu um erro ao atualizar o estoque. Por favor, entre em contato com o suporte.',
      });
    }
  };


  // Redireciona se não houver dados do carrinho
  useEffect(() => {
    if (carrinho.length === 0 || total === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrinho Vazio',
        text: 'Seu carrinho está vazio. Adicione produtos antes de prosseguir para o pagamento.',
      }).then(() => {
        navigate('/carrinho');
      });
    }
  }, [carrinho, total, navigate]);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePagamento = async (e) => {
    e.preventDefault();
    setLoading(true);

     // PASSO 1: VERIFICA O ESTOQUE
    const estoqueDisponivel = await verificarEstoque();
    if (!estoqueDisponivel) {
      setLoading(false);
      return; // Interrompe a função se não houver estoque
    }

    // --- SIMULAÇÃO DE PAGAMENTO ---
    try {
      if (metodoPagamento === 'qrcode') {
        // Simulação de pagamento via QR Code
        // Em um app real, o backend geraria o QR Code e o status do pagamento seria monitorado
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay
        Swal.fire({
          icon: 'success',
          title: 'Pagamento via QR Code Processado!',
          text: 'Seu pagamento foi realizado com sucesso. Obrigado pela compra!',
        });
      } else {
        // Simulação de pagamento via Cartão de Crédito
        if (!cardDetails.numeroCartao || !cardDetails.nomeTitular || !cardDetails.validade || !cardDetails.cvc) {
          throw new Error('Por favor, preencha todos os dados do cartão.');
        }
        if (cardDetails.numeroCartao.replace(/\s/g, '').length < 16) {
          throw new Error('Número do cartão inválido.');
        }
        if (cardDetails.cvc.length < 3) {
          throw new Error('CVC inválido.');
        }
        // Mais validações (validade, CVC, etc.) seriam adicionadas aqui

        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula delay
        Swal.fire({
          icon: 'success',
          title: 'Pagamento via Cartão Processado!',
          text: 'Seu pagamento com cartão foi realizado com sucesso. Obrigado pela compra!',
        });
      }
       // --- CHAMA A FUNÇÃO DE ATUALIZAÇÃO DO ESTOQUE AQUI ---
      await atualizarEstoque();
      // Após o sucesso simulado, limpar o carrinho e redirecionar
      onLimparCarrinho();
      // apenas redireciona para a home
      navigate('/'); 

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro no Pagamento',
        text: error.message || 'Ocorreu um erro ao processar seu pagamento. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>💰 Finalizar Compra</h2>
      <div style={styles.paymentSummary}>
        <h3 style={styles.subTitulo}>Resumo do Pedido</h3>
        {carrinho.length > 0 ? (
          <ul style={styles.listaItens}>
            {carrinho.map(item => (
              <li key={item.id} style={styles.itemResumo}>
                {item.nome} x {item.quantidade} - R$ {(item.preco * item.quantidade).toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.vazio}>Nenhum item no carrinho.</p>
        )}
        <p style={styles.totalValue}>Total: <strong>R$ {total.toFixed(2)}</strong></p>
      </div>

      <div style={styles.paymentMethods}>
        <h3 style={styles.subTitulo}>Escolha o Método de Pagamento</h3>
        <div style={styles.methodSelection}>
          <button 
            style={{...styles.btnMetodo, ...(metodoPagamento === 'qrcode' ? styles.btnMetodoActive : {})}}
            onClick={() => setMetodoPagamento('qrcode')}
            disabled={loading}
          >
            Pagar com QR Code
          </button>
          <button 
            style={{...styles.btnMetodo, ...(metodoPagamento === 'cartao' ? styles.btnMetodoActive : {})}}
            onClick={() => setMetodoPagamento('cartao')}
            disabled={loading}
          >
            Pagar com Cartão de Crédito
          </button>
        </div>

        {metodoPagamento === 'qrcode' && (
          <div style={styles.qrcodeSection}>
            <h4 style={styles.subTitulo}>Escaneie para efetuar o pagamento</h4>
            {total > 0 ? (
              <div style={styles.qrcodeDisplay}>
                <QRCodeCanvas 
                    value={`(84) 997028897`} // Conteúdo simulado do QR Code
                    size={256}
                    level="H"
                    includeMargin={true}
                    fgColor="#000000"
                    bgColor="#ffffff"
                />
                <p style={styles.qrcodeText}>Descrição: Pagamento do pedido</p>
                <p style={styles.qrcodeText}>Valor: <strong>R$ {total.toFixed(2)}</strong></p>
                <p style={styles.securityNote}>
                  <strong>Importante:</strong> Logo após o pagamento, o QR Code ser&aacute; exclu&iacute;do. 
                </p>
              </div>
            ) : (
              <p style={styles.vazio}>Adicione itens ao carrinho para gerar o QR Code.</p>
            )}
            <button onClick={handlePagamento} disabled={loading} style={styles.btnConfirmar}>
              {loading ? 'Processando...' : 'Confirmar Pagamento via QR Code'}
            </button>
          </div>
        )}

        {metodoPagamento === 'cartao' && (
          <div style={styles.cardSection}>
            <h4 style={styles.subTitulo}>Dados do Cartão de Crédito</h4>
            <form onSubmit={handlePagamento} style={styles.form}>
              <label style={styles.label}>Número do Cartão:</label>
              <input 
                type="text" 
                name="numeroCartao" 
                value={cardDetails.numeroCartao} 
                onChange={handleCardChange} 
                maxLength="19" // Incluindo espaços
                placeholder="XXXX XXXX XXXX XXXX"
                required 
                style={styles.input}
              />
              <label style={styles.label}>Nome do Titular:</label>
              <input 
                type="text" 
                name="nomeTitular" 
                value={cardDetails.nomeTitular} 
                onChange={handleCardChange} 
                required 
                style={styles.input}
              />
              <div style={styles.cardRow}>
                <div style={styles.cardCol}>
                  <label style={styles.label}>Validade (MM/AA):</label>
                  <input 
                    type="text" 
                    name="validade" 
                    value={cardDetails.validade} 
                    onChange={handleCardChange} 
                    maxLength="5" 
                    placeholder="MM/AA"
                    required 
                    style={styles.input}
                  />
                </div>
                <div style={styles.cardCol}>
                  <label style={styles.label}>CVC:</label>
                  <input 
                    type="text" 
                    name="cvc" 
                    value={cardDetails.cvc} 
                    onChange={handleCardChange} 
                    maxLength="4" 
                    placeholder="XXX"
                    required 
                    style={styles.input}
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} style={styles.btnConfirmar}>
                {loading ? 'Processando...' : 'Pagar com Cartão de Crédito'}
              </button>
            </form>
            <p style={styles.securityNote}>
              <strong>Importante:</strong> Nunca compartilhe seus dados de cartão com terceiros.
            </p>
          </div>
        )}
      </div>
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
    color: '#333',
    textAlign: 'center'
  },
  subTitulo: {
    fontSize: '22px',
    marginBottom: '15px',
    color: '#444',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  },
  vazio: {
    fontSize: '18px',
    color: '#777',
    textAlign: 'center'
  },
  paymentSummary: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    marginBottom: '25px'
  },
  listaItens: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '15px'
  },
  itemResumo: {
    padding: '8px 0',
    borderBottom: '1px dashed #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#00695c',
    textAlign: 'right',
    marginTop: '15px'
  },
  paymentMethods: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  methodSelection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px'
  },
  btnMetodo: {
    flex: 1,
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#555'
  },
  btnMetodoActive: {
    backgroundColor: '#43a047',
    color: '#fff',
    borderColor: '#43a047',
    boxShadow: '0 4px 8px rgba(67, 160, 71, 0.2)'
  },
  qrcodeSection: {
    textAlign: 'center',
    padding: '20px',
    border: '1px dashed #ddd',
    borderRadius: '10px',
    backgroundColor: '#fdfdfd'
  },
  qrcodeDisplay: {
    margin: '20px auto',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.08)',
    display: 'inline-block' // Para centralizar o QR Code
  },
  qrcodeText: {
    fontSize: '16px',
    margin: '10px 0 5px',
    color: '#333'
  },
  cardSection: {
    padding: '20px',
    border: '1px dashed #ddd',
    borderRadius: '10px',
    backgroundColor: '#fdfdfd'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box' // Garante que padding não aumente a largura total
  },
  cardRow: {
    display: 'flex',
    gap: '15px'
  },
  cardCol: {
    flex: 1
  },
  btnConfirmar: {
    backgroundColor: '#43a047',
    color: '#fff',
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
    width: '100%'
  },
  securityNote: {
    fontSize: '12px',
    color: '#888',
    marginTop: '20px',
    textAlign: 'center'
  },
};

export default Pagamento;
