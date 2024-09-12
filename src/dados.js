const recintos = [
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { 'MACACO': 3 } },
    { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
    { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: { 'GAZELA': 1 } },
    { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
    { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { 'LEAO': 1 } },
];

const animais = {
    'LEAO': { tamanho: 3, bioma: 'savana' },
    'LEOPARDO': { tamanho: 2, bioma: 'savana' },
    'CROCODILO': { tamanho: 3, bioma: 'rio' },
    'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'] },
    'GAZELA': { tamanho: 2, bioma: 'savana' },
    'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'] },
};

export { recintos, animais };
