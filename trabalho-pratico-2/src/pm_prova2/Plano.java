/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pm_prova2;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author glbra
 */
public abstract class Plano {

    private String nome;
    private double valorMensal;
    private int quantidadeMaximaAtividades;
    private StatusPlano status;
    private final List<Atividade> atividades = new ArrayList<>();

    public Plano(String nome,
                 double valorMensal,
                 int quantidadeMaximaAtividades,
                 StatusPlano status) {

        this.nome = nome;
        this.valorMensal = valorMensal;
        this.quantidadeMaximaAtividades = quantidadeMaximaAtividades;
        this.status = status;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValorMensal() {
        return valorMensal;
    }

    public void setValorMensal(double valorMensal) {
        this.valorMensal = valorMensal;
    }

    public int getQuantidadeMaximaAtividades() {
        return quantidadeMaximaAtividades;
    }

    public void setQuantidadeMaximaAtividades(int quantidadeMaximaAtividades) {
        this.quantidadeMaximaAtividades = quantidadeMaximaAtividades;
    }

    public StatusPlano getStatus() {
        return status;
    }

    public void setStatus(StatusPlano status) {
        this.status = status;
    }

    public List<Atividade> getAtividades() {
        return atividades;
    }

    public void removerAtividade(Atividade atividade) {
        atividades.remove(atividade);
    }

    /**
     * Associa uma atividade ao plano, respeitando as regras do plano.
     * @return mensagem de erro, ou null se a associacao foi feita
     */
    public String associarAtividade(Atividade atividade) {
        if (status != StatusPlano.ATIVO) {
            return "Plano nao esta ativo.";
        }
        if (atividade.getStatus() == StatusAtividade.INATIVA) {
            return "Atividade inativa nao pode ser associada.";
        }
        if (atividades.contains(atividade)) {
            return "Atividade ja associada a este plano.";
        }
        if (atividades.size() >= quantidadeMaximaAtividades) {
            return "Plano ja atingiu o limite de atividades.";
        }
        if (atividade.atividadeColetiva() && !permiteAtividadeColetiva()) {
            return "Este plano nao permite atividades coletivas.";
        }
        atividades.add(atividade);
        return null;
    }

    protected void exibirAtividades() {
        if (atividades.isEmpty()) {
            System.out.println("    (nenhuma atividade associada)");
        }
        for (Atividade a : atividades) {
            System.out.println("    - " + a.getNome() + " (" + a.getHorario() + ")");
        }
    }

    public abstract void exibirDetalhes();

    public abstract boolean permiteAtividadeColetiva();
}
   
