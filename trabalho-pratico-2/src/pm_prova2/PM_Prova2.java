package pm_prova2;

import java.util.List;
import java.util.Scanner;

public class PM_Prova2 {

    private static final Scanner entrada = new Scanner(System.in);

    public static void main(String[] args) {
        Academia academia = new Academia();
        carregarDadosIniciais(academia);

        int opcao;
        do {
            exibirMenu();
            opcao = lerInteiro("Opcao: ");
            System.out.println();
            switch (opcao) {
                case 1 -> associarAtividade(academia);
                case 2 -> academia.exibirAtividades();
                case 3 -> academia.exibirPlanos();
                case 4 -> academia.exibirPlanosAtivos();
                case 5 -> emitirCertificado(academia);
                case 6 -> registrarPresenca(academia);
                case 7 -> System.out.println(academia.removerAtividadesInativas()
                        + " atividade(s) inativa(s) removida(s).");
                case 0 -> System.out.println("Encerrando...");
                default -> System.out.println("Opcao invalida.");
            }
            System.out.println();
        } while (opcao != 0);
    }

    private static void carregarDadosIniciais(Academia academia) {
        academia.adicionarAtividade(new Musculacao("Musculacao", "07:00", 60, 30, 90.0,
                StatusAtividade.ATIVA, 25));
        academia.adicionarAtividade(new Natacao("Natacao", "18:00", 45, 15, 120.0,
                StatusAtividade.ATIVA, 1.8));
        academia.adicionarAtividade(new Spinning("Spinning", "19:00", 50, 20, 100.0,
                StatusAtividade.INATIVA, 20));

        academia.adicionarPlano(new PlanoBasico("Basico", 99.9, 2, StatusPlano.ATIVO));
        academia.adicionarPlano(new PlanoPremium("Premium", 199.9, 5, StatusPlano.ATIVO));
    }

    private static void exibirMenu() {
        System.out.println("===== ACADEMIA =====");
        System.out.println("1 - Associar atividade a um plano");
        System.out.println("2 - Exibir atividades");
        System.out.println("3 - Exibir planos");
        System.out.println("4 - Exibir planos ativos");
        System.out.println("5 - Emitir certificado");
        System.out.println("6 - Registrar presenca em atividade");
        System.out.println("7 - Remover atividades inativas");
        System.out.println("0 - Sair");
    }

    private static void associarAtividade(Academia academia) {
        if (academia.getPlanos().isEmpty() || academia.getAtividades().isEmpty()) {
            System.out.println("E necessario ter planos e atividades cadastrados.");
            return;
        }
        academia.exibirPlanos();
        Plano plano = escolher(academia.getPlanos(), "Numero do plano: ");
        academia.exibirAtividades();
        Atividade atividade = escolher(academia.getAtividades(), "Numero da atividade: ");
        if (plano == null || atividade == null) {
            return;
        }
        String erro = academia.associarAtividadeAoPlano(plano, atividade);
        System.out.println(erro == null ? "Atividade associada com sucesso." : "Nao foi possivel: " + erro);
    }

    private static void emitirCertificado(Academia academia) {
        academia.exibirAtividades();
        Atividade atividade = escolher(academia.getAtividades(), "Numero da atividade: ");
        if (atividade == null) {
            return;
        }
        academia.emitirCertificado(atividade, lerTexto("Nome do participante: "));
    }

    private static void registrarPresenca(Academia academia) {
        academia.exibirAtividades();
        Atividade atividade = escolher(academia.getAtividades(), "Numero da atividade: ");
        if (atividade == null) {
            return;
        }
        academia.registrarPresenca(atividade, lerTexto("Nome do participante: "));
    }

    private static <T> T escolher(List<T> lista, String mensagem) {
        int indice = lerInteiro(mensagem) - 1;
        if (indice < 0 || indice >= lista.size()) {
            System.out.println("Numero invalido.");
            return null;
        }
        return lista.get(indice);
    }

    private static int lerInteiro(String mensagem) {
        System.out.print(mensagem);
        try {
            return Integer.parseInt(entrada.nextLine().trim());
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private static String lerTexto(String mensagem) {
        System.out.print(mensagem);
        return entrada.nextLine().trim();
    }
}
