const STORAGE_KEY = "financeiro_web_v2";

const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

const today = new Date().toISOString().slice(0, 10);
const currentMonth = today.slice(0, 7);

const routes = [
    { id: "dashboard", label: "Dashboard", icon: "▦" },
    { id: "receitas", label: "Receitas", icon: "+" },
    { id: "fixas", label: "Despesas Fixas", icon: "⌂" },
    { id: "variaveis", label: "Despesas Variáveis", icon: "↯" },
    { id: "cartoes", label: "Cartões de Crédito", icon: "▣" },
    { id: "investimentos", label: "Investimentos", icon: "◈" },
    { id: "ganhos", label: "Ganhos", icon: "◇" },
    { id: "resumo", label: "Resumo Financeiro", icon: "Σ" },
    { id: "reserva", label: "Reserva Financeira", icon: "◉" },
    { id: "relatorios", label: "Relatórios", icon: "⇩" },
    { id: "configuracoes", label: "Configurações", icon: "⚙" }
];

const schemas = {
    receitas: {
        title: "Receita",
        collection: "receitas",
        fields: [
            { key: "descricao", label: "Descrição", type: "text", required: true, placeholder: "Salário" },
            { key: "valor", label: "Valor", type: "number", required: true, step: "0.01" },
            { key: "data", label: "Data", type: "date", required: true },
            { key: "recebido", label: "Recebido?", type: "select", options: ["Sim", "Não"] },
            { key: "categoria", label: "Categoria", type: "select", options: ["Salário", "Adiantamento", "Duda", "Gabriel", "Aviso", "Aluguel", "Outros"] }
        ]
    },
    fixas: {
        title: "Despesa fixa",
        collection: "fixas",
        fields: [
            { key: "descricao", label: "Descrição", type: "text", required: true, placeholder: "Energia" },
            { key: "valor", label: "Valor", type: "number", required: true, step: "0.01" },
            { key: "pago", label: "Pago?", type: "select", options: ["Sim", "Não"] },
            { key: "vencimento", label: "Vencimento", type: "number", min: "1", max: "31" },
            { key: "categoria", label: "Categoria", type: "select", options: ["Moradia", "Serviços", "Internet", "Celular", "Casa", "Outros"] }
        ]
    },
    variaveis: {
        title: "Despesa variável",
        collection: "variaveis",
        fields: [
            { key: "descricao", label: "Descrição", type: "text", required: true, placeholder: "Mercado" },
            { key: "valor", label: "Valor", type: "number", required: true, step: "0.01" },
            { key: "data", label: "Data", type: "date", required: true },
            { key: "categoria", label: "Categoria", type: "select", options: ["Mercado", "Farmácia", "Lazer", "Combustível", "Restaurante", "Outros"] }
        ]
    },
    cartoes: {
        title: "Cartão",
        collection: "cartoes",
        fields: [
            { key: "nome", label: "Nome", type: "text", required: true },
            { key: "limite", label: "Limite", type: "number", required: true, step: "0.01" },
            { key: "fechamento", label: "Fechamento", type: "number", min: "1", max: "31" },
            { key: "vencimento", label: "Vencimento", type: "number", min: "1", max: "31" }
        ]
    },
    compras: {
        title: "Compra no cartão",
        collection: "compras",
        fields: [
            { key: "descricao", label: "Descrição", type: "text", required: true, placeholder: "Roupa" },
            { key: "valor", label: "Valor da parcela", type: "number", required: true, step: "0.01" },
            { key: "parcelas", label: "Parcelas", type: "number", required: true, min: "1" },
            { key: "parcelaAtual", label: "Parcela atual", type: "number", required: true, min: "1" },
            { key: "cartaoId", label: "Cartão", type: "select", dynamic: "cartoes" },
            { key: "data", label: "Data", type: "date", required: true }
        ]
    },
    investimentos: {
        title: "Investimento",
        collection: "investimentos",
        fields: [
            { key: "instituicao", label: "Instituição", type: "text", required: true, placeholder: "BB Brasil" },
            { key: "produto", label: "Produto", type: "text", required: true, placeholder: "CDI" },
            { key: "valorAplicado", label: "Valor aplicado", type: "number", required: true, step: "0.01" },
            { key: "data", label: "Data", type: "date", required: true },
            { key: "rentabilidade", label: "Rentabilidade %", type: "number", step: "0.01" }
        ]
    },
    ganhos: {
        title: "Ganho",
        collection: "ganhos",
        fields: [
            { key: "data", label: "Data", type: "date", required: true },
            { key: "valor", label: "Valor", type: "number", required: true, step: "0.01" },
            { key: "categoria", label: "Categoria", type: "select", options: ["Ganhos Mercado Pago", "Ganhos CDI", "Cashback", "Rendimentos"] }
        ]
    },
    reserva: {
        title: "Reserva",
        collection: "reserva",
        singleton: true,
        fields: [
            { key: "mesAnterior", label: "Mês anterior", type: "number", step: "0.01" },
            { key: "totalCofrinho", label: "Total cofrinho", type: "number", step: "0.01" },
            { key: "totalConta", label: "Total em conta", type: "number", step: "0.01" },
            { key: "restante", label: "Restante", type: "number", step: "0.01" }
        ]
    }
};

const seed = {
    theme: "light",
    receitas: [
        item({ descricao: "Adiantamento", valor: 1558.03, data: today, recebido: "Não", categoria: "Adiantamento" }),
        item({ descricao: "Salário", valor: 1290.96, data: today, recebido: "Não", categoria: "Salário" }),
        item({ descricao: "Duda", valor: 800.64, data: today, recebido: "Não", categoria: "Duda" }),
        item({ descricao: "Gabriel", valor: 9, data: today, recebido: "Não", categoria: "Gabriel" }),
        item({ descricao: "Mãe Algar Abril", valor: 89.98, data: today, recebido: "Não", categoria: "Outros" }),
        item({ descricao: "Aviso", valor: 600, data: today, recebido: "Não", categoria: "Aviso" })
    ],
    fixas: [
        item({ descricao: "Energia", valor: 229.84, pago: "Não", vencimento: 10, categoria: "Casa" }),
        item({ descricao: "Água", valor: 139.82, pago: "Não", vencimento: 12, categoria: "Casa" }),
        item({ descricao: "Algar Mãe Abril", valor: 89.98, pago: "Não", vencimento: 15, categoria: "Internet" }),
        item({ descricao: "Algar Casa Abril", valor: 99.35, pago: "Não", vencimento: 15, categoria: "Internet" }),
        item({ descricao: "Plano/Cel", valor: 125, pago: "Não", vencimento: 20, categoria: "Celular" }),
        item({ descricao: "Caixa / Conta", valor: 16, pago: "Não", vencimento: 22, categoria: "Serviços" }),
        item({ descricao: "Parcela / Casa", valor: 825, pago: "Não", vencimento: 25, categoria: "Moradia" })
    ],
    variaveis: [],
    cartoes: [
        item({ nome: "Nubank", limite: 2500, fechamento: 1, vencimento: 8 }),
        item({ nome: "Mercado Pago", limite: 1800, fechamento: 3, vencimento: 10 }),
        item({ nome: "Will Bank", limite: 1200, fechamento: 5, vencimento: 12 })
    ],
    compras: [],
    investimentos: [
        item({ instituicao: "BB Brasil", produto: "CDI", valorAplicado: 24.72, data: today, rentabilidade: 1 }),
        item({ instituicao: "BB Brasil", produto: "Cofrinho", valorAplicado: 22.01, data: today, rentabilidade: 1 })
    ],
    ganhos: [
        item({ data: `${today.slice(0, 8)}03`, valor: 0.07, categoria: "Ganhos Mercado Pago" }),
        item({ data: `${today.slice(0, 8)}01`, valor: 5.18, categoria: "Ganhos CDI" }),
        item({ data: `${today.slice(0, 8)}02`, valor: 9.58, categoria: "Ganhos CDI" }),
        item({ data: `${today.slice(0, 8)}03`, valor: 9.51, categoria: "Ganhos CDI" })
    ],
    reserva: {
        mesAnterior: 23668.85,
        totalCofrinho: 20028.04,
        totalConta: 0.07,
        restante: 17595.08
    }
};

seed.compras = [
    item({ descricao: "Lay Carro e Moto", valor: 230, parcelas: 1, parcelaAtual: 1, cartaoId: seed.cartoes[0].id, data: today }),
    item({ descricao: "Alura", valor: 93, parcelas: 1, parcelaAtual: 1, cartaoId: seed.cartoes[0].id, data: today }),
    item({ descricao: "Manual", valor: 69.56, parcelas: 1, parcelaAtual: 1, cartaoId: seed.cartoes[0].id, data: today }),
    item({ descricao: "Chat GPT", valor: 41.47, parcelas: 1, parcelaAtual: 1, cartaoId: seed.cartoes[0].id, data: today }),
    item({ descricao: "IOF Chat", valor: 1.45, parcelas: 1, parcelaAtual: 1, cartaoId: seed.cartoes[0].id, data: today }),
    item({ descricao: "Pneus", valor: 108.57, parcelas: 1, parcelaAtual: 1, cartaoId: seed.cartoes[1].id, data: today }),
    item({ descricao: "TV", valor: 124.38, parcelas: 18, parcelaAtual: 3, cartaoId: seed.cartoes[1].id, data: today }),
    item({ descricao: "Sombrit 5/8", valor: 33.53, parcelas: 8, parcelaAtual: 5, cartaoId: seed.cartoes[1].id, data: today }),
    item({ descricao: "Roupa, Cama", valor: 206.08, parcelas: 12, parcelaAtual: 8, cartaoId: seed.cartoes[2].id, data: today })
];

let state = loadState();
let activeRoute = "dashboard";
let activeEdit = null;
let selectedMonth = state.selectedMonth || currentMonth;
let filters = { month: selectedMonth, year: selectedMonth.slice(0, 4), category: "", card: "" };

const app = document.getElementById("app");
const nav = document.getElementById("nav");
const sidebar = document.getElementById("sidebar");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const modalBackdrop = document.getElementById("modalBackdrop");
const quickBackdrop = document.getElementById("quickBackdrop");
const recordForm = document.getElementById("recordForm");
const importInput = document.getElementById("importInput");

boot();

function item(data){
    const id = window.crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now() + Math.random());

    return { id, ...data };
}

function loadState(){
    const saved = localStorage.getItem(STORAGE_KEY);
    if(!saved){
        return clone(seed);
    }

    try{
        return { ...clone(seed), ...JSON.parse(saved) };
    }catch(error){
        return clone(seed);
    }
}

function saveState(){
    state.selectedMonth = selectedMonth;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function boot(){
    document.body.classList.toggle("dark", state.theme === "dark");
    renderNav();
    bindGlobalEvents();
    render();
}

function renderNav(){
    nav.innerHTML = routes.map(route => `
        <button class="${route.id === activeRoute ? "active" : ""}" data-route="${route.id}">
            <span class="nav-icon">${route.icon}</span>
            <span>${route.label}</span>
        </button>
    `).join("");
}

function bindGlobalEvents(){
    nav.addEventListener("click", event => {
        const button = event.target.closest("[data-route]");
        if(!button) return;
        activeRoute = button.dataset.route;
        sidebar.classList.remove("open");
        drawerBackdrop.classList.remove("open");
        renderNav();
        render();
    });

    document.getElementById("menuToggle").addEventListener("click", () => {
        sidebar.classList.add("open");
        drawerBackdrop.classList.add("open");
    });

    drawerBackdrop.addEventListener("click", () => {
        sidebar.classList.remove("open");
        drawerBackdrop.classList.remove("open");
    });

    document.getElementById("themeToggle").addEventListener("click", () => {
        state.theme = state.theme === "dark" ? "light" : "dark";
        document.body.classList.toggle("dark", state.theme === "dark");
        saveState();
        render();
    });

    document.getElementById("activeMonth").addEventListener("change", event => {
        setSelectedMonth(event.target.value);
    });

    document.getElementById("prevMonth").addEventListener("click", () => {
        setSelectedMonth(addMonths(selectedMonth, -1));
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        setSelectedMonth(addMonths(selectedMonth, 1));
    });

    document.querySelectorAll("[data-action='quick-open']").forEach(button => {
        button.addEventListener("click", openQuick);
    });

    document.getElementById("modalClose").addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", event => {
        if(event.target === modalBackdrop) closeModal();
    });

    document.getElementById("quickClose").addEventListener("click", closeQuick);
    quickBackdrop.addEventListener("click", event => {
        if(event.target === quickBackdrop) closeQuick();
    });

    document.getElementById("quickForm").addEventListener("submit", handleQuick);

    document.getElementById("globalSearch").addEventListener("input", render);

    importInput.addEventListener("change", importJson);
}

function render(){
    document.getElementById("themeToggle").textContent = state.theme === "dark" ? "Tema claro" : "Tema escuro";
    document.getElementById("activeMonth").value = selectedMonth;
    document.getElementById("sideAvailable").textContent = currency(calc().valorDisponivel);

    const pages = {
        dashboard: renderDashboard,
        receitas: () => renderCrudPage("receitas", "Receitas", "Controle tudo que entra no mês.", receitaMetrics()),
        fixas: () => renderCrudPage("fixas", "Despesas Fixas", "Organize contas recorrentes e vencimentos.", fixedMetrics()),
        variaveis: () => renderCrudPage("variaveis", "Despesas Variáveis", "Acompanhe gastos livres por data e categoria.", variableMetrics()),
        cartoes: renderCardsPage,
        investimentos: () => renderCrudPage("investimentos", "Investimentos", "Registre aplicações, rentabilidade e patrimônio.", investmentMetrics()),
        ganhos: () => renderCrudPage("ganhos", "Ganhos", "Monitore CDI, Mercado Pago, cashback e rendimentos.", gainMetrics()),
        resumo: renderResumo,
        reserva: renderReserva,
        relatorios: renderRelatorios,
        configuracoes: renderConfiguracoes
    };

    pages[activeRoute]();
    requestAnimationFrame(drawCharts);
}

function calc(){
    const receitasDoMes = bySelectedMonth(state.receitas);
    const variaveisDoMes = bySelectedMonth(state.variaveis);
    const comprasDoMes = bySelectedMonth(state.compras);

    const receitas = sum(receitasDoMes, "valor");
    const recebido = sum(receitasDoMes.filter(x => x.recebido === "Sim"), "valor");
    const receitaPendente = receitas - recebido;
    const fixas = sum(state.fixas, "valor");
    const fixasPagas = sum(state.fixas.filter(x => x.pago === "Sim"), "valor");
    const fixasPendentes = fixas - fixasPagas;
    const variaveis = sum(variaveisDoMes, "valor");
    const cartoes = sum(comprasDoMes, "valor");
    const totalDespesas = fixas + variaveis + cartoes;
    const investido = sum(state.investimentos, "valorAplicado");
    const lucro = state.investimentos.reduce((total, inv) => total + num(inv.valorAplicado) * (num(inv.rentabilidade) / 100), 0);
    const ganhos = sum(state.ganhos, "valor");
    const valorRestante = receitas - totalDespesas;
    const valorDisponivel = recebido - fixasPagas - variaveis - cartoes;

    return {
        receitas,
        recebido,
        receitaPendente,
        fixas,
        fixasPagas,
        fixasPendentes,
        variaveis,
        cartoes,
        totalDespesas,
        investido,
        lucro,
        ganhos,
        patrimonio: investido + lucro + num(state.reserva.totalCofrinho) + num(state.reserva.totalConta),
        valorRestante,
        valorDisponivel
    };
}

function receitaMetrics(){
    const c = calc();
    return [
        ["Total de Receitas", c.receitas],
        ["Total Recebido", c.recebido],
        ["Total Pendente", c.receitaPendente]
    ];
}

function fixedMetrics(){
    const c = calc();
    return [
        ["Total de Despesas Fixas", c.fixas],
        ["Total Pago", c.fixasPagas],
        ["Total Pendente", c.fixasPendentes]
    ];
}

function variableMetrics(){
    const mes = bySelectedMonth(state.variaveis);
    const ano = state.variaveis.filter(x => String(x.data || "").slice(0, 4) === selectedMonth.slice(0, 4));
    return [
        [`Total de ${monthLabel(selectedMonth)}`, sum(mes, "valor")],
        ["Total anual", sum(ano, "valor")],
        ["Média mensal", sum(ano, "valor") / 12]
    ];
}

function investmentMetrics(){
    const c = calc();
    return [
        ["Valor Investido", c.investido],
        ["Lucro Acumulado", c.lucro],
        ["Rentabilidade média", average(state.investimentos, "rentabilidade"), "%"],
        ["Patrimônio Total", c.patrimonio]
    ];
}

function gainMetrics(){
    const mes = bySelectedMonth(state.ganhos);
    const ano = state.ganhos.filter(x => String(x.data || "").slice(0, 4) === selectedMonth.slice(0, 4));
    return [
        [`Total de ${monthLabel(selectedMonth)}`, sum(mes, "valor")],
        ["Total do ano", sum(ano, "valor")],
        ["Total geral", sum(state.ganhos, "valor")]
    ];
}

function renderDashboard(){
    const c = calc();
    app.innerHTML = `
        ${pageHead("Dashboard", `Uma visão clara do mês de ${monthLabel(selectedMonth)}.`, "Visão geral")}
        <section class="card-grid">
            ${metric("Saldo Atual", c.receitas - c.totalDespesas)}
            ${metric("Total Receitas", c.receitas, "positive")}
            ${metric("Total Despesas", c.totalDespesas, "negative")}
            ${metric("Total Cartões", c.cartoes, "warning")}
            ${metric("Total Investido", c.investido, "positive")}
            ${metric("Valor Restante", c.valorRestante, c.valorRestante >= 0 ? "positive" : "negative")}
            ${metric("Valor Disponível", c.valorDisponivel, c.valorDisponivel >= 0 ? "positive" : "negative")}
            ${metric("Patrimônio Total", c.patrimonio, "positive")}
        </section>
        <section class="chart-grid">
            ${chartPanel("Receitas x Despesas", "chartReceitasDespesas")}
            ${chartPanel("Gastos por Categoria", "chartCategorias")}
            ${chartPanel("Evolução Mensal", "chartMensal")}
            ${chartPanel("Evolução Patrimonial", "chartPatrimonio")}
        </section>
    `;
}

function renderCrudPage(key, title, subtitle, metrics){
    const schema = schemas[key];
    const rows = filteredRows(state[schema.collection]);
    app.innerHTML = `
        ${pageHead(title, `${subtitle} Visualizando ${monthLabel(selectedMonth)}.`, "Cadastro", `<button class="primary-button" onclick="openModal('${key}')">Novo registro</button>`)}
        <section class="card-grid">
            ${metrics.map(m => metric(m[0], m[2] === "%" ? `${formatNumber(m[1])}%` : m[1])).join("")}
        </section>
        ${filtersMarkup(schema)}
        ${table(schema, rows)}
    `;
}

function renderCardsPage(){
    const c = calc();
    app.innerHTML = `
        ${pageHead("Cartões de Crédito", `Controle limites e faturas de ${monthLabel(selectedMonth)}.`, "Faturas", `
            <button class="ghost-button" onclick="openModal('cartoes')">Novo cartão</button>
            <button class="primary-button" onclick="openModal('compras')">Nova compra</button>
        `)}
        <section class="card-grid">
            ${metric("Valor total da fatura", c.cartoes, "warning")}
            ${metric("Próxima fatura", nextInvoice(), "warning")}
            ${metric("Parcelas futuras", futureInstallments(), "negative")}
            ${metric("Limite disponível", totalAvailableLimit(), "positive")}
        </section>
        <section class="split-grid">
            <div class="panel list-panel">
                <h3>Cartões cadastrados</h3>
                <div class="stack">
                    ${state.cartoes.map(cardSummary).join("")}
                </div>
            </div>
            <div class="panel list-panel">
                <h3>Compras parceladas</h3>
                <div class="stack">
                    ${state.compras.map(purchaseSummary).join("") || empty("Nenhuma compra cadastrada.")}
                </div>
            </div>
        </section>
    `;
}

function renderResumo(){
    const c = calc();
    const items = [
        ["Valor Gasto", c.totalDespesas],
        ["Valor a Pagar", c.fixasPendentes + c.cartoes],
        ["Receita Prevista", c.receitas],
        ["Valor a Receber", c.receitaPendente],
        ["Gastos Variáveis", c.variaveis],
        ["Total Pago", c.fixasPagas],
        ["Restante", c.valorRestante],
        ["Investimento", c.investido]
    ];

    app.innerHTML = `
        ${pageHead("Resumo Financeiro", `Área equivalente à Soma TOTAL da planilha para ${monthLabel(selectedMonth)}.`, "Soma total")}
        <section class="card-grid">
            ${items.map(item => metric(item[0], item[1], item[1] < 0 ? "negative" : "")).join("")}
        </section>
    `;
}

function renderReserva(){
    const r = state.reserva;
    const somaTotal = num(r.totalCofrinho) + num(r.totalConta);
    app.innerHTML = `
        ${pageHead("Reserva Financeira", "Controle de cofrinho, conta e restante.", "Cofrinho", `<button class="primary-button" onclick="openModal('reserva')">Editar reserva</button>`)}
        <section class="card-grid">
            ${metric("Mês Anterior", r.mesAnterior)}
            ${metric("Total Cofrinho", r.totalCofrinho, "positive")}
            ${metric("Total em Conta", r.totalConta, "positive")}
            ${metric("Soma Total", somaTotal, "positive")}
            ${metric("Restante", r.restante, "positive")}
        </section>
    `;
}

function renderRelatorios(){
    const all = allRows();
    const rows = filteredRows(all, true);
    app.innerHTML = `
        ${pageHead("Relatórios", `Exporte dados filtrados. Mês ativo: ${monthLabel(selectedMonth)}.`, "Exportação", `
            <button class="ghost-button" onclick="exportCsv()">CSV</button>
            <button class="ghost-button" onclick="exportExcel()">Excel</button>
            <button class="primary-button" onclick="window.print()">PDF</button>
        `)}
        ${filtersMarkup({ fields: [{ key: "categoria" }, { key: "cartaoId" }] }, true)}
        <section class="card-grid">
            ${metric("Registros filtrados", rows.length)}
            ${metric("Total movimentado", sum(rows, "valor") + sum(rows, "valorAplicado"))}
        </section>
        ${table(reportSchema(), rows)}
    `;
}

function renderConfiguracoes(){
    app.innerHTML = `
        ${pageHead("Configurações", "Gerencie backup, importação e dados locais.", "Preferências")}
        <section class="split-grid">
            <div class="panel list-panel">
                <h3>Backup</h3>
                <p class="subtitle">Baixe todos os dados em JSON para restaurar depois.</p>
                <br>
                <div class="actions-row">
                    <button class="primary-button" onclick="backupJson()">Backup JSON</button>
                    <button class="ghost-button" onclick="document.getElementById('importInput').click()">Importar JSON</button>
                </div>
            </div>
            <div class="panel list-panel">
                <h3>Dados iniciais</h3>
                <p class="subtitle">Restaura os exemplos baseados na planilha enviada.</p>
                <br>
                <button class="danger-button" onclick="resetData()">Restaurar exemplos</button>
            </div>
        </section>
    `;
}

function pageHead(title, subtitle, kicker, actions = ""){
    return `
        <header class="page-head">
            <div>
                <p class="eyebrow">${kicker}</p>
                <h1>${title}</h1>
                <p class="subtitle">${subtitle}</p>
            </div>
            <div class="actions-row">${actions}</div>
        </header>
    `;
}

function metric(label, value, tone = ""){
    const text = typeof value === "number" ? currency(value) : value;
    return `
        <article class="metric-card">
            <span>${label}</span>
            <strong class="${tone}">${text}</strong>
        </article>
    `;
}

function chartPanel(title, id){
    return `
        <article class="panel chart-panel">
            <h3>${title}</h3>
            <canvas id="${id}" width="640" height="280"></canvas>
        </article>
    `;
}

function filtersMarkup(schema, report = false){
    const categories = unique([
        ...state.receitas.map(x => x.categoria),
        ...state.fixas.map(x => x.categoria),
        ...state.variaveis.map(x => x.categoria),
        ...state.ganhos.map(x => x.categoria)
    ]);

    return `
        <div class="filters-row">
            <input type="month" value="${filters.month}" onchange="setFilter('month', this.value)" title="Mês do filtro">
            <select onchange="setFilter('year', this.value)">
                ${yearOptions()}
            </select>
            <select onchange="setFilter('category', this.value)">
                <option value="">Todas categorias</option>
                ${categories.map(c => `<option ${filters.category === c ? "selected" : ""}>${c}</option>`).join("")}
            </select>
            ${report ? `
                <select onchange="setFilter('card', this.value)">
                    <option value="">Todos cartões</option>
                    ${state.cartoes.map(c => `<option value="${c.id}" ${filters.card === c.id ? "selected" : ""}>${c.nome}</option>`).join("")}
                </select>
            ` : ""}
        </div>
    `;
}

function table(schema, rows){
    const fields = schema.fields.filter(f => !["id"].includes(f.key));
    if(!rows.length){
        return `<section class="panel empty-state">Nenhum registro encontrado.</section>`;
    }

    return `
        <section class="panel table-card">
            <div class="table-scroll">
                <table>
                    <thead>
                        <tr>
                            ${fields.map(f => `<th>${f.label}</th>`).join("")}
                            ${schema.collection ? "<th>Ações</th>" : ""}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                ${fields.map(f => `<td>${cellValue(row, f)}</td>`).join("")}
                                ${schema.collection ? `
                                    <td>
                                        <div class="row-actions">
                                            <button onclick="openModal('${schema.collection}', '${row.id}')">Editar</button>
                                            <button onclick="deleteRecord('${schema.collection}', '${row.id}')">Excluir</button>
                                        </div>
                                    </td>
                                ` : ""}
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

function reportSchema(){
    return {
        fields: [
            { key: "origem", label: "Origem" },
            { key: "descricao", label: "Descrição" },
            { key: "categoria", label: "Categoria" },
            { key: "data", label: "Data" },
            { key: "cartao", label: "Cartão" },
            { key: "valor", label: "Valor" }
        ]
    };
}

function cellValue(row, field){
    const value = row[field.key];
    if(["valor", "limite", "valorAplicado"].includes(field.key)) return currency(value);
    if(field.key === "rentabilidade") return `${formatNumber(value)}%`;
    if(field.key === "recebido" || field.key === "pago"){
        return `<span class="pill ${value === "Sim" ? "green" : "red"}">${value}</span>`;
    }
    if(field.key === "cartaoId") return cardName(value);
    if(field.key === "cartao") return value || "-";
    if(field.key === "parcelaAtual") return `${row.parcelaAtual}/${row.parcelas}`;
    return value || "-";
}

function openModal(key, id = ""){
    const schema = schemas[key];
    const isSingleton = schema.singleton;
    const collection = schema.collection;
    const record = isSingleton ? state[collection] : (id ? state[collection].find(x => x.id === id) : {});
    activeEdit = { key, id };

    document.getElementById("modalKicker").textContent = id || isSingleton ? "Editar" : "Novo cadastro";
    document.getElementById("modalTitle").textContent = schema.title;

    recordForm.innerHTML = schema.fields.map(field => fieldMarkup(field, record)).join("") + `
        <div class="form-actions">
            <button type="button" class="ghost-button" onclick="closeModal()">Cancelar</button>
            <button type="submit" class="primary-button">Salvar</button>
        </div>
    `;

    recordForm.onsubmit = submitRecord;
    modalBackdrop.classList.add("open");
}

function fieldMarkup(field, record){
    const value = record[field.key] ?? defaultFieldValue(field);
    const required = field.required ? "required" : "";
    const attrs = `${required} ${field.step ? `step="${field.step}"` : ""} ${field.min ? `min="${field.min}"` : ""} ${field.max ? `max="${field.max}"` : ""}`;

    if(field.type === "select"){
        const options = field.dynamic === "cartoes"
            ? state.cartoes.map(c => ({ value: c.id, label: c.nome }))
            : field.options.map(option => ({ value: option, label: option }));

        return `
            <div class="form-field">
                <label for="${field.key}">${field.label}</label>
                <select id="${field.key}" name="${field.key}" ${required}>
                    ${options.map(option => `<option value="${option.value}" ${String(value) === String(option.value) ? "selected" : ""}>${option.label}</option>`).join("")}
                </select>
            </div>
        `;
    }

    return `
        <div class="form-field">
            <label for="${field.key}">${field.label}</label>
            <input id="${field.key}" name="${field.key}" type="${field.type}" value="${value}" placeholder="${field.placeholder || ""}" ${attrs}>
        </div>
    `;
}

function submitRecord(event){
    event.preventDefault();
    const schema = schemas[activeEdit.key];
    const collection = schema.collection;
    const data = {};

    schema.fields.forEach(field => {
        const value = recordForm.elements[field.key].value;
        data[field.key] = field.type === "number" ? num(value) : value;
    });

    if(schema.singleton){
        state[collection] = data;
    }else if(activeEdit.id){
        state[collection] = state[collection].map(row => row.id === activeEdit.id ? { ...row, ...data } : row);
    }else{
        state[collection].push(item(data));
    }

    saveState();
    closeModal();
    render();
}

function closeModal(){
    modalBackdrop.classList.remove("open");
    recordForm.innerHTML = "";
    activeEdit = null;
}

function deleteRecord(collection, id){
    if(!confirm("Tem certeza que deseja excluir este registro?")) return;
    state[collection] = state[collection].filter(row => row.id !== id);
    saveState();
    render();
}

function openQuick(){
    quickBackdrop.classList.add("open");
    document.getElementById("quickInput").focus();
}

function closeQuick(){
    quickBackdrop.classList.remove("open");
    document.getElementById("quickInput").value = "";
}

function handleQuick(event){
    event.preventDefault();
    const raw = document.getElementById("quickInput").value.trim();
    const match = raw.match(/^([+-])\s*([\d.,]+)\s+(.+)$/);

    if(!match){
        alert("Use um formato como +1290 salário ou -230 mercado");
        return;
    }

    const signal = match[1];
    const valor = parseMoney(match[2]);
    const descricao = match[3].trim();
    const categoria = guessCategory(descricao, signal);
    const data = defaultDateForSelectedMonth();

    if(signal === "+"){
        state.receitas.push(item({ descricao, valor, data, recebido: "Sim", categoria }));
        activeRoute = "receitas";
    }else{
        state.variaveis.push(item({ descricao, valor, data, categoria }));
        activeRoute = "variaveis";
    }

    saveState();
    closeQuick();
    renderNav();
    render();
}

function guessCategory(text, signal){
    const lower = text.toLowerCase();
    if(signal === "+"){
        if(lower.includes("sal")) return "Salário";
        if(lower.includes("alug")) return "Aluguel";
        return "Outros";
    }
    if(lower.includes("merc")) return "Mercado";
    if(lower.includes("farm")) return "Farmácia";
    if(lower.includes("gas") || lower.includes("comb")) return "Combustível";
    if(lower.includes("rest")) return "Restaurante";
    if(lower.includes("lazer")) return "Lazer";
    return "Outros";
}

function setFilter(key, value){
    filters[key] = value;
    if(key === "month" && value){
        selectedMonth = value;
        filters.year = value.slice(0, 4);
        saveState();
    }
    render();
}

function setSelectedMonth(month){
    if(!month) return;
    selectedMonth = month;
    filters.month = month;
    filters.year = month.slice(0, 4);
    saveState();
    render();
}

function filteredRows(rows, report = false){
    const query = document.getElementById("globalSearch").value.toLowerCase().trim();
    return rows.filter(row => {
        const date = String(row.data || "");
        const monthOk = !filters.month || !date || date.slice(0, 7) === filters.month || !("data" in row);
        const yearOk = !filters.year || !date || date.slice(0, 4) === filters.year || !("data" in row);
        const categoryOk = !filters.category || row.categoria === filters.category;
        const cardOk = !report || !filters.card || row.cartaoId === filters.card || row.cartao === cardName(filters.card);
        const queryOk = !query || JSON.stringify(row).toLowerCase().includes(query);
        return monthOk && yearOk && categoryOk && cardOk && queryOk;
    });
}

function allRows(){
    return [
        ...state.receitas.map(x => ({ origem: "Receita", descricao: x.descricao, categoria: x.categoria, data: x.data, valor: x.valor })),
        ...state.fixas.map(x => ({ origem: "Despesa Fixa", descricao: x.descricao, categoria: x.categoria, data: "", valor: x.valor })),
        ...state.variaveis.map(x => ({ origem: "Despesa Variável", descricao: x.descricao, categoria: x.categoria, data: x.data, valor: x.valor })),
        ...state.compras.map(x => ({ origem: "Cartão", descricao: x.descricao, categoria: "Cartão de Crédito", data: x.data, cartaoId: x.cartaoId, cartao: cardName(x.cartaoId), valor: x.valor })),
        ...state.investimentos.map(x => ({ origem: "Investimento", descricao: x.produto, categoria: x.instituicao, data: x.data, valor: x.valorAplicado })),
        ...state.ganhos.map(x => ({ origem: "Ganho", descricao: x.categoria, categoria: x.categoria, data: x.data, valor: x.valor }))
    ];
}

function cardSummary(card){
    const total = sum(bySelectedMonth(state.compras).filter(x => x.cartaoId === card.id), "valor");
    return `
        <div class="mini-item">
            <div>
                <strong>${card.nome}</strong>
                <span>Fecha dia ${card.fechamento} • vence dia ${card.vencimento}</span>
            </div>
            <div>
                <strong>${currency(num(card.limite) - total)}</strong>
                <span>disponível</span>
            </div>
            <div class="row-actions">
                <button onclick="openModal('cartoes', '${card.id}')">Editar</button>
                <button onclick="deleteRecord('cartoes', '${card.id}')">Excluir</button>
            </div>
        </div>
    `;
}

function purchaseSummary(purchase){
    return `
        <div class="mini-item">
            <div>
                <strong>${purchase.descricao}</strong>
                <span>${cardName(purchase.cartaoId)} • ${purchase.parcelaAtual}/${purchase.parcelas}</span>
            </div>
            <strong>${currency(purchase.valor)}</strong>
            <div class="row-actions">
                <button onclick="openModal('compras', '${purchase.id}')">Editar</button>
                <button onclick="deleteRecord('compras', '${purchase.id}')">Excluir</button>
            </div>
        </div>
    `;
}

function drawCharts(){
    drawBar("chartReceitasDespesas", [
        ["Receitas", calc().receitas, "#06a561"],
        ["Despesas", calc().totalDespesas, "#dc2626"]
    ]);

    const categoryData = groupByCategory();
    drawDonut("chartCategorias", categoryData);
    drawLine("chartMensal", monthlyEvolution());
    drawLine("chartPatrimonio", patrimonyEvolution(), "#7c3aed");
}

function drawBar(id, data){
    const canvas = document.getElementById(id);
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const max = Math.max(...data.map(x => x[1]), 1);
    ctx.clearRect(0, 0, w, h);
    ctx.font = "14px Segoe UI";
    data.forEach((item, index) => {
        const barW = 120;
        const x = 120 + index * 190;
        const barH = (item[1] / max) * 170;
        ctx.fillStyle = item[2];
        ctx.fillRect(x, h - 52 - barH, barW, barH);
        ctx.fillStyle = getTextColor();
        ctx.fillText(item[0], x, h - 26);
        ctx.fillText(currency(item[1]), x - 12, h - 62 - barH);
    });
}

function drawDonut(id, data){
    const canvas = document.getElementById(id);
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const total = data.reduce((sum, x) => sum + x.value, 0) || 1;
    const colors = ["#7c3aed", "#06b6d4", "#06a561", "#d97706", "#dc2626", "#2563eb"];
    let start = -Math.PI / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    data.forEach((item, index) => {
        const angle = (item.value / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(150, 135);
        ctx.arc(150, 135, 92, start, start + angle);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        start += angle;
    });
    ctx.fillStyle = getSurfaceColor();
    ctx.beginPath();
    ctx.arc(150, 135, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "13px Segoe UI";
    data.slice(0, 5).forEach((item, index) => {
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(310, 55 + index * 30, 12, 12);
        ctx.fillStyle = getTextColor();
        ctx.fillText(`${item.label} ${currency(item.value)}`, 330, 66 + index * 30);
    });
}

function drawLine(id, data, color = "#06b6d4"){
    const canvas = document.getElementById(id);
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const max = Math.max(...data.map(x => x.value), 1);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(148,163,184,.35)";
    ctx.beginPath();
    ctx.moveTo(40, 30);
    ctx.lineTo(40, h - 45);
    ctx.lineTo(w - 24, h - 45);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = 48 + index * ((w - 90) / Math.max(data.length - 1, 1));
        const y = h - 45 - (point.value / max) * 185;
        if(index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = getTextColor();
    ctx.font = "12px Segoe UI";
    data.forEach((point, index) => {
        const x = 48 + index * ((w - 90) / Math.max(data.length - 1, 1));
        ctx.fillText(point.label, x - 12, h - 20);
    });
}

function groupByCategory(){
    const rows = [...state.fixas, ...bySelectedMonth(state.variaveis)];
    const map = {};
    rows.forEach(row => {
        map[row.categoria || "Outros"] = (map[row.categoria || "Outros"] || 0) + num(row.valor);
    });
    return Object.entries(map).map(([label, value]) => ({ label, value }));
}

function monthlyEvolution(){
    const months = lastMonths(6);
    return months.map(month => {
        const receitas = sum(state.receitas.filter(x => String(x.data || "").slice(0, 7) === month.value), "valor");
        const despesas = sum([...state.variaveis, ...state.compras].filter(x => String(x.data || "").slice(0, 7) === month.value), "valor") + calc().fixas;
        return { label: month.label, value: Math.max(receitas - despesas, 0) };
    });
}

function patrimonyEvolution(){
    const base = calc().patrimonio;
    return lastMonths(6).map((month, index) => ({ label: month.label, value: Math.max(base - (5 - index) * 350, 0) }));
}

function lastMonths(count){
    const date = new Date();
    return Array.from({ length: count }, (_, index) => {
        const d = new Date(date.getFullYear(), date.getMonth() - (count - 1 - index), 1);
        return {
            value: d.toISOString().slice(0, 7),
            label: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")
        };
    });
}

function backupJson(){
    download("financeiro-backup.json", JSON.stringify(state, null, 2), "application/json");
}

function importJson(event){
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try{
            state = { ...clone(seed), ...JSON.parse(reader.result) };
            saveState();
            render();
            alert("Backup importado com sucesso.");
        }catch(error){
            alert("Arquivo inválido.");
        }
    };
    reader.readAsText(file);
}

function exportCsv(){
    const rows = filteredRows(allRows(), true);
    const header = ["Origem", "Descrição", "Categoria", "Data", "Cartão", "Valor"];
    const body = rows.map(row => [row.origem, row.descricao, row.categoria, row.data || "", row.cartao || "", num(row.valor).toFixed(2)]);
    const csv = [header, ...body].map(line => line.map(csvCell).join(";")).join("\n");
    download("relatorio-financeiro.csv", csv, "text/csv;charset=utf-8");
}

function exportExcel(){
    const rows = filteredRows(allRows(), true);
    const html = `
        <table>
            <tr><th>Origem</th><th>Descrição</th><th>Categoria</th><th>Data</th><th>Cartão</th><th>Valor</th></tr>
            ${rows.map(row => `<tr><td>${row.origem}</td><td>${row.descricao}</td><td>${row.categoria}</td><td>${row.data || ""}</td><td>${row.cartao || ""}</td><td>${num(row.valor).toFixed(2)}</td></tr>`).join("")}
        </table>
    `;
    download("relatorio-financeiro.xls", html, "application/vnd.ms-excel");
}

function resetData(){
    if(!confirm("Restaurar os dados de exemplo? Seus dados atuais serão substituídos.")) return;
    state = clone(seed);
    saveState();
    render();
}

function download(filename, content, type){
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

function csvCell(value){
    return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function nextInvoice(){
    return sum(bySelectedMonth(state.compras).filter(x => num(x.parcelaAtual) <= num(x.parcelas)), "valor");
}

function futureInstallments(){
    return state.compras.reduce((total, x) => total + Math.max(num(x.parcelas) - num(x.parcelaAtual), 0) * num(x.valor), 0);
}

function totalAvailableLimit(){
    return state.cartoes.reduce((total, card) => {
        const used = sum(bySelectedMonth(state.compras).filter(x => x.cartaoId === card.id), "valor");
        return total + num(card.limite) - used;
    }, 0);
}

function cardName(id){
    return state.cartoes.find(card => card.id === id)?.nome || "-";
}

function defaultFieldValue(field){
    if(field.type === "date") return defaultDateForSelectedMonth();
    if(field.type === "number") return "";
    if(field.type === "select") return field.options ? field.options[0] : state.cartoes[0]?.id;
    return "";
}

function yearOptions(){
    const year = Number(selectedMonth.slice(0, 4));
    return [year - 1, year, year + 1].map(y => `<option value="${y}" ${String(y) === filters.year ? "selected" : ""}>${y}</option>`).join("");
}

function bySelectedMonth(rows){
    return rows.filter(row => String(row.data || "").slice(0, 7) === selectedMonth);
}

function addMonths(month, amount){
    const [year, monthIndex] = month.split("-").map(Number);
    const date = new Date(year, monthIndex - 1 + amount, 1);
    return date.toISOString().slice(0, 7);
}

function monthLabel(month){
    const [year, monthIndex] = month.split("-").map(Number);
    const label = new Date(year, monthIndex - 1, 1).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    return label.charAt(0).toUpperCase() + label.slice(1);
}

function defaultDateForSelectedMonth(){
    return selectedMonth === currentMonth ? today : `${selectedMonth}-01`;
}

function sum(rows, key){
    return rows.reduce((total, row) => total + num(row[key]), 0);
}

function average(rows, key){
    if(!rows.length) return 0;
    return sum(rows, key) / rows.length;
}

function num(value){
    return Number(String(value ?? 0).replace(",", ".")) || 0;
}

function parseMoney(value){
    return Number(String(value).replace(/\./g, "").replace(",", ".")) || 0;
}

function currency(value){
    return money.format(num(value));
}

function formatNumber(value){
    return Number(value || 0).toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

function unique(values){
    return [...new Set(values.filter(Boolean))].sort();
}

function clone(value){
    return JSON.parse(JSON.stringify(value));
}

function empty(text){
    return `<div class="empty-state">${text}</div>`;
}

function getTextColor(){
    return getComputedStyle(document.body).getPropertyValue("--text").trim();
}

function getSurfaceColor(){
    return getComputedStyle(document.body).getPropertyValue("--surface").trim();
}

window.openModal = openModal;
window.closeModal = closeModal;
window.deleteRecord = deleteRecord;
window.setFilter = setFilter;
window.backupJson = backupJson;
window.exportCsv = exportCsv;
window.exportExcel = exportExcel;
window.resetData = resetData;
