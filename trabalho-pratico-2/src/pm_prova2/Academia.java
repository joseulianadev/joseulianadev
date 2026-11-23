package pm_prova2;

import java.util.ArrayList;
import java.util.List;

/** Gerencia as atividades e os planos da academia. */
public class Academia {

    private final List<Atividade> atividades = new ArrayList<>();
    private final List<Plano> planos = new ArrayList<>();

    public void adicionarAtividade(Atividade atividade) {
        atividades.add(atividade);
    }

    public void adicionarPlano(Plano plano) {
        planos.add(plano);
    }

    public List<Atividade> getAtividades() {
        return atividades;
    }

    public List<Plano> getPlanos() {
        return planos;
    }

    public String associarAtividadeAoPlano(Plano plano, Atividade atividade) {
        return plano.associarAtividade(atividade);
    }

    public void exibirAtividades() {
        if (atividades.isEmpty()) {
            System.out.println("Nenhuma atividade cadastrada.");
            return;
        }
        for (int i = 0; i < atividades.size(); i++) {
            System.out.print((i + 1) + " - ");
            atividades.get(i).exibirDetalhes();
        }
    }

    public void exibirPlanos() {
        if (planos.isEmpty()) {
            System.out.println("Nenhum plano cadastrado.");
            return;
        }
        for (int i = 0; i < planos.size(); i++) {
            System.out.print((i + 1) + " - ");
            planos.get(i).exibirDetalhes();
        }
    }

    public void exibirPlanosAtivos() {
        boolean achou = false;
        for (Plano p : planos) {
            if (p.getStatus() == StatusPlano.ATIVO) {
                p.exibirDetalhes();
                achou = true;
            }
        }
        if (!achou) {
            System.out.println("Nenhum plano ativo.");
        }
    }

    public void emitirCertificado(Atividade atividade, String nomeParticipante) {
        if (atividade instanceof Certificavel) {
            ((Certificavel) atividade).emitirCertificado(nomeParticipante);
        } else {
            System.out.println("Esta atividade nao emite certificado.");
        }
    }

    public void registrarPresenca(Atividade atividade, String nomeParticipante) {
        if (atividade instanceof ControladorPresenca) {
            ((ControladorPresenca) atividade).registrarPresenca(nomeParticipante);
        } else {
            System.out.println("Esta atividade nao registra frequencia.");
        }
    }

    /** Remove atividades inativas do sistema e dos planos. @return quantidade removida */
    public int removerAtividadesInativas() {
        List<Atividade> inativas = new ArrayList<>();
        for (Atividade a : atividades) {
            if (a.getStatus() == StatusAtividade.INATIVA) {
                inativas.add(a);
            }
        }
        for (Atividade a : inativas) {
            atividades.remove(a);
            for (Plano p : planos) {
                p.removerAtividade(a);
            }
        }
        return inativas.size();
    }
}
