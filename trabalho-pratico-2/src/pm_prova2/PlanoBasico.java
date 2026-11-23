package pm_prova2;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class PlanoBasico extends Plano implements ControladorPresenca {

    private final Set<String> acessosDoDia = new HashSet<>();
    private LocalDate dataControle = LocalDate.now();

    public PlanoBasico(String nome, double valorMensal, int quantidadeMaximaAtividades,
                       StatusPlano status) {
        super(nome, valorMensal, quantidadeMaximaAtividades, status);
    }

    /** Registra o acesso do cliente a academia; permite apenas 1 acesso por dia. */
    @Override
    public void registrarPresenca(String nomeCliente) {
        LocalDate hoje = LocalDate.now();
        if (!hoje.equals(dataControle)) {
            acessosDoDia.clear();
            dataControle = hoje;
        }
        if (acessosDoDia.add(nomeCliente)) {
            System.out.println("Acesso de " + nomeCliente + " registrado no plano " + getNome() + ".");
        } else {
            System.out.println("Acesso negado: " + nomeCliente + " ja acessou a academia hoje.");
        }
    }

    @Override
    public void exibirDetalhes() {
        System.out.printf("[Plano Basico] %s | R$ %.2f | max %d atividades | %s | 1 acesso/dia%n",
                getNome(), getValorMensal(), getQuantidadeMaximaAtividades(), getStatus());
        exibirAtividades();
    }

    @Override
    public boolean permiteAtividadeColetiva() {
        return false;
    }
}
