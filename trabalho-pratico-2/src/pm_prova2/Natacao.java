package pm_prova2;

import java.util.ArrayList;
import java.util.List;

public class Natacao extends Atividade implements Certificavel, ControladorPresenca {

    private double profundidadePiscina;
    private final List<String> presencas = new ArrayList<>();

    public Natacao(String nome, String horario, int duracaoAula,
                   int quantidadeMaximaParticipantes, double valorMensal,
                   StatusAtividade status, double profundidadePiscina) {
        super(nome, horario, duracaoAula, quantidadeMaximaParticipantes, valorMensal, status);
        this.profundidadePiscina = profundidadePiscina;
    }

    public double getProfundidadePiscina() {
        return profundidadePiscina;
    }

    public void setProfundidadePiscina(double profundidadePiscina) {
        this.profundidadePiscina = profundidadePiscina;
    }

    public List<String> getPresencas() {
        return presencas;
    }

    @Override
    public void emitirCertificado(String nomeParticipante) {
        System.out.println("=== CERTIFICADO ===");
        System.out.println("Certificamos que " + nomeParticipante
                + " participou da atividade de " + getNome() + ".");
        System.out.println("===================");
    }

    @Override
    public void registrarPresenca(String nomeParticipante) {
        presencas.add(nomeParticipante);
        System.out.println("Presenca de " + nomeParticipante + " registrada em " + getNome() + ".");
    }

    @Override
    public void exibirDetalhes() {
        System.out.printf("[Natacao] %s | %s | %d min | max %d participantes | R$ %.2f | %s | piscina %.1fm | presencas: %d%n",
                getNome(), getHorario(), getDuracaoAula(), getQuantidadeMaximaParticipantes(),
                getValorMensal(), getStatus(), profundidadePiscina, presencas.size());
    }

    @Override
    public boolean atividadeColetiva() {
        return true;
    }
}
