import { recintos, animais } from './dados.js';

class RecintosZoo {

    analisaRecintos(animal, quantidade) {

        if (!animais[animal]) {
            return { erro: "Animal inválido" }
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" }
        }

        const infoAnimal = animais[animal];
        const biomasAdequados = Array.isArray(infoAnimal.bioma) ? infoAnimal.bioma : [infoAnimal.bioma]; // Para que biomasAdequados sempre seja um array.

        let resultados = [];

        for (const recinto of recintos) {
            const { numero, bioma, tamanhoTotal, animais: animaisExistentes = {} } = recinto;

            const biomaRecinto = Array.isArray(bioma) ? bioma : [bioma];
            if (!biomaRecinto.some(b => biomasAdequados.includes(b))) {
                continue;
            }

            // Calcula o espaço ocupado por animais existentes
            let espacoOcupado = 0;
            for (const tipoAnimal in animaisExistentes) {
                if (animais[tipoAnimal]) {
                    espacoOcupado += animaisExistentes[tipoAnimal] * animais[tipoAnimal].tamanho;
                }
            }

            // Espaço extra caso mais de uma espécia exista
            const numeroDeEspecies = Object.keys(animaisExistentes).length;
            if (numeroDeEspecies >= 1) {
                for (const especieAnimal in animaisExistentes) {
                    if (especieAnimal !== animal) {
                        espacoOcupado += 1;
                    }
                }
            }

            // Calcula o espaço disponível
            let espacoNecessario = quantidade * infoAnimal.tamanho;
            let espacoDisponivel = tamanhoTotal - espacoOcupado;

            // Aplicando as regras:
            const carnivoros = ['LEAO', 'LEOPARDO', 'CROCODILO'];
            const jaTemCarnivoro = Object.keys(animaisExistentes).some(tipo => carnivoros.includes(tipo));
            let pularProximoRecinto = false;

            if ((carnivoros.includes(animal) && jaTemCarnivoro) || jaTemCarnivoro) { // Verificação de carnívoros
                continue;
            }
            if ((carnivoros.includes(animal) && numeroDeEspecies !== 0)) { 
                for (const especieAnimal in animaisExistentes) {
                    if (especieAnimal !== animal) {
                        pularProximoRecinto = true;
                        break;
                    }
                }
                if (pularProximoRecinto) {
                    continue;
                }
            }

            if (animal === 'MACACO' && numeroDeEspecies === 0 && espacoDisponivel < espacoNecessario) { // Verifica se é um macaco e se o recinto está vazio
                continue; 
            }

            if (animal === 'HIPOPOTAMO' && !biomasAdequados.includes('savana') && !biomasAdequados.includes('rio')) { // Verifica se o animal é um hipopótamo e o bioma é o adequado
                continue;
            }

            espacoDisponivel = espacoDisponivel - espacoNecessario;

            if (espacoDisponivel < 0) { // Verifica se o espaço disponível é suficiente
                continue;
            }
            
            // Adiciona o recinto viável aos resultados
            resultados.push(`Recinto ${numero} (espaço livre: ${espacoDisponivel} total: ${tamanhoTotal})`);
        }

        // Verifica se existem recintos viáveis
        if (resultados.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis: resultados };
    }
}

export { RecintosZoo as RecintosZoo };
