package pm_prova2;

import java.util.ArrayList;
import java.util.List;

public class Spinning extends Atividade implements ControladorPresenca {

    private int quantidadeBicicletas;
    private final List<String> presencas = new ArrayList<>();

    public Spinning(String nome, String horario, int duracaoAula,
                    int quantidadeMaximaParticipantes, double valorMensal,
                    StatusAtividade status, int quantidadeBicicletas) {
        super(nome, horario, duracaoAula, quantidadeMaximaParticipantes, valorMensal, status);
        this.quantidadeBicicletas = quantidadeBicicletas;
    }

    public int getQuantidadeBicicletas() {
        return quantidadeBicicletas;
    }

    public void setQuantidadeBicicletas(int quantidadeBicicletas) {
        this.quantidadeBicicletas = quantidadeBicicletas;
    }

    public List<String> getPresencas() {
        return presencas;
    }

    @Override
    public void registrarPresenca(String nomeParticipante) {
        presencas.add(nomeParticipante);
        System.out.println("Presenca de " + nomeParticipante + " registrada em " + getNome() + ".");
    }

    @Override
    public void exibirDetalhes() {
        System.out.printf("[Spinning] %s | %s | %d min | max %d participantes | R$ %.2f | %s | %d bicicletas | presencas: %d%n",
                getNome(), getHorario(), getDuracaoAula(), getQuantidadeMaximaParticipantes(),
                getValorMensal(), getStatus(), quantidadeBicicletas, presencas.size());
    }

    @Override
    public boolean atividadeColetiva() {
        return true;
    }
}
