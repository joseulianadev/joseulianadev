package pm_prova2;

public class Musculacao extends Atividade {

    private int quantidadeAparelhos;

    public Musculacao(String nome, String horario, int duracaoAula,
                      int quantidadeMaximaParticipantes, double valorMensal,
                      StatusAtividade status, int quantidadeAparelhos) {
        super(nome, horario, duracaoAula, quantidadeMaximaParticipantes, valorMensal, status);
        this.quantidadeAparelhos = quantidadeAparelhos;
    }

    public int getQuantidadeAparelhos() {
        return quantidadeAparelhos;
    }

    public void setQuantidadeAparelhos(int quantidadeAparelhos) {
        this.quantidadeAparelhos = quantidadeAparelhos;
    }

    @Override
    public void exibirDetalhes() {
        System.out.printf("[Musculacao] %s | %s | %d min | max %d participantes | R$ %.2f | %s | %d aparelhos%n",
                getNome(), getHorario(), getDuracaoAula(), getQuantidadeMaximaParticipantes(),
                getValorMensal(), getStatus(), quantidadeAparelhos);
    }

    @Override
    public boolean atividadeColetiva() {
        return false;
    }
}
