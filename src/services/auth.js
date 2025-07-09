// src/services/auth.js

// Essa função simula a recuperação de um token salvo (ex: após login)
export function getAuthToken() {
   const token = 'eyJraWQiOiJ...SeuTokenAqui...'; 

  // Aqui você pode pegar o token do localStorage ou de onde ele for salvo após login
 // const token = localStorage.getItem('authToken');

  // Se quiser testar com um token estático:
  // const token = 'eyJraWQiOiJ...';

  return token;
}
