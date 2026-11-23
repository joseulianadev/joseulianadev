package pm_prova2;

public class PlanoPremium extends Plano {

    public PlanoPremium(String nome, double valorMensal, int quantidadeMaximaAtividades,
                        StatusPlano status) {
        super(nome, valorMensal, quantidadeMaximaAtividades, status);
    }

    @Override
    public void exibirDetalhes() {
        System.out.printf("[Plano Premium] %s | R$ %.2f | max %d atividades | %s | acesso ilimitado%n",
                getNome(), getValorMensal(), getQuantidadeMaximaAtividades(), getStatus());
        exibirAtividades();
    }

    @Override
    public boolean permiteAtividadeColetiva() {
        return true;
    }
}
