/* ===== APP CLIENTES — PRP 5G Academy ===== */
(function() {

// ── Datos de conversaciones de muestra ──
var chatData = {
    maria: {
        name: 'María García', emoji: '👩',
        status: 'online', statusText: 'En línea',
        messages: [
            { from: 'client', text: '¡Hola! Vi que ofrecen tratamientos con PRP 5G. ¿Podrían darme más información?', time: '10:15', date: 'Hoy' },
            { from: 'agent',  text: '¡Hola María! Claro, con gusto. El PRP 5G es la tecnología más avanzada en medicina regenerativa. ¿Qué área le interesa tratar?', time: '10:16', date: 'Hoy' },
            { from: 'client', text: 'Me interesa para rejuvenecimiento facial. Tengo 45 años y quiero algo efectivo.', time: '10:18', date: 'Hoy' },
            { from: 'agent',  text: 'Perfecto. Para rejuvenecimiento facial, el PRP 5G con exosomas es ideal. Los resultados son visibles desde la primera sesión. ¿Le gustaría agendar una consulta?', time: '10:20', date: 'Hoy' },
            { from: 'client', text: '¿Cuánto cuesta la consulta?', time: '10:28', date: 'Hoy' },
            { from: 'agent',  text: 'La consulta de valoración es gratuita. Le explicamos el protocolo personalizado y respondemos todas sus dudas. ¿Qué día le quedaría bien?', time: '10:29', date: 'Hoy' },
            { from: 'client', text: '¿Puede ser el viernes en la mañana?', time: '10:32', date: 'Hoy' }
        ]
    },
    laura: {
        name: 'Laura Quintero', emoji: '👩‍🦱',
        status: 'online', statusText: 'En línea',
        messages: [
            { from: 'client', text: '¡Hola! Tengo una cita agendada para mañana a las 10am. ¿Puedo cambiarla para el jueves?', time: '11:45', date: 'Hoy' },
            { from: 'agent',  text: 'Hola Laura, claro. El jueves tenemos disponibilidad a las 9am, 11am y 3pm. ¿Cuál le viene mejor?', time: '11:47', date: 'Hoy' },
            { from: 'client', text: '¡Las 11am perfecto!', time: '11:50', date: 'Hoy' },
            { from: 'agent',  text: '¡Listo! Cita confirmada para el jueves a las 11am. Le enviaré recordatorio el día anterior. ¿Algo más en que pueda ayudarle?', time: '11:51', date: 'Hoy' },
            { from: 'client', text: 'Sí, ¿debo venir en ayunas?', time: '11:55', date: 'Hoy' },
            { from: 'agent',  text: 'No es necesario ayuno. Recomendamos estar bien hidratada (2 vasos de agua antes) y no haber aplicado cremas en el área a tratar esa mañana.', time: '11:56', date: 'Hoy' },
            { from: 'client', text: '¡Perfecto, muchas gracias!', time: '11:58', date: 'Hoy' }
        ]
    },
    ana: {
        name: 'Ana Sofía Ruiz', emoji: '👩‍🦰',
        status: 'online', statusText: 'En línea',
        messages: [
            { from: 'client', text: 'Hola, me recomendaron con ustedes para tratar cicatrices de acné.', time: '09:10', date: 'Hoy' },
            { from: 'agent',  text: '¡Hola Ana Sofía! Las cicatrices de acné tipo rolling y boxcar responden muy bien al PRP 5G. ¿Desde hace cuánto tiene las cicatrices?', time: '09:11', date: 'Hoy' },
            { from: 'client', text: 'Desde hace unos 5 años. Tengo bastante marcas en mejillas.', time: '09:13', date: 'Hoy' },
            { from: 'agent',  text: 'Perfectamente. Con PRP 5G + microneedling vemos mejorías desde la 2da sesión. ¿Puede enviarnos una fotografía del área para valorarla?', time: '09:14', date: 'Hoy' }
        ]
    },
    carlos: {
        name: 'Carlos Mendoza', emoji: '👨',
        status: 'offline', statusText: 'Hace 2 horas',
        messages: [
            { from: 'client', text: 'Buenas tardes, ¿tienen disponibilidad para tratamiento de alopecia?', time: '16:05', date: 'Ayer' },
            { from: 'agent',  text: '¡Buenas tardes! Sí tenemos disponibilidad. El PRP 5G para alopecia tiene resultados excepcionales — 52% de aumento en densidad capilar a los 6 meses. ¿Qué tipo de alopecia tiene?', time: '16:07', date: 'Ayer' },
            { from: 'client', text: 'Alopecia androgenética, escala Hamilton III. He probado minoxidil sin buenos resultados.', time: '16:22', date: 'Ayer' },
            { from: 'agent',  text: 'Entiendo. Muchos casos HN III han tenido reversión completa con PRP 5G + exosomas. El PRP regenera el folículo, diferente al minoxidil. Le envío el protocolo detallado.', time: '16:25', date: 'Ayer' },
            { from: 'client', text: 'Me interesa mucho. ¿Cuántas sesiones serían?', time: '16:40', date: 'Ayer' }
        ]
    },
    jorge: {
        name: 'Dr. Jorge Palma', emoji: '👨‍⚕️',
        status: 'offline', statusText: 'Hace 1 día',
        messages: [
            { from: 'client', text: 'Buen día, soy médico y estoy interesado en certificarme en PRP 5G. ¿Tienen capacitaciones?', time: '11:30', date: 'Mar' },
            { from: 'agent',  text: '¡Buenos días Dr. Palma! Sí, contamos con el programa PRP 5G Academy — 40 horas, 6 módulos certificados. ¿Le enviamos el temario completo?', time: '11:32', date: 'Mar' },
            { from: 'client', text: 'Sí por favor. También quisiera saber sobre el equipo necesario.', time: '11:45', date: 'Mar' },
            { from: 'agent',  text: 'Perfecto. Le envío el temario y lista de equipamiento certificado. El programa incluye acceso de por vida y evaluaciones prácticas.', time: '11:47', date: 'Mar' },
            { from: 'client', text: '¿Tienen descuento para residentes?', time: '14:20', date: 'Mar' }
        ]
    }
};

var activeContactId = null;

// ── Inyectar HTML de la página en el DOM ──
function injectClientsPage() {
    var contentArea = document.querySelector('.content-area');
    if (!contentArea || document.getElementById('page-clientes')) return;

    var page = document.createElement('div');
    page.id = 'page-clientes';
    page.className = 'page';
    page.innerHTML = [
        '<div class="clients-layout" id="clientsLayout">',
        '  <div class="conversations-panel" id="conversationsPanel">',
        '    <div class="conversations-header">',
        '      <h2>💬 Conversaciones</h2>',
        '      <span class="conversations-count">5 activas</span>',
        '    </div>',
        '    <div class="conversations-search">',
        '      <input type="text" placeholder="🔍 Buscar conversación…" oninput="filterConversations(this.value)">',
        '    </div>',
        '    <div class="conversations-list" id="conversationsList"></div>',
        '  </div>',
        '  <div class="chat-panel" id="chatPanel">',
        '    <div class="chat-empty-state" id="chatEmptyState">',
        '      <div class="empty-icon">💬</div>',
        '      <p style="font-size:16px;">Selecciona una conversación para comenzar</p>',
        '      <p style="font-size:13px;opacity:0.6;">Las respuestas son gestionadas por tu agente de WhatsApp</p>',
        '    </div>',
        '    <div class="chat-header" id="chatHeader" style="display:none;">',
        '      <button class="chat-back-btn" id="chatBackBtn" onclick="closeChat()" title="Volver a conversaciones">←</button>',
        '      <div class="chat-contact-avatar" id="chatContactAvatar">👤</div>',
        '      <div class="chat-contact-info">',
        '        <div class="chat-contact-name" id="chatContactName">—</div>',
        '        <div class="chat-contact-status" id="chatContactStatus">—</div>',
        '      </div>',
        '      <div class="chat-wa-badge">🟢 WhatsApp</div>',
        '    </div>',
        '    <div class="chat-messages" id="chatMessages" style="display:none;"></div>',
        '    <div class="chat-input-area" id="chatInputArea" style="display:none;">',
        '      <textarea class="chat-input" id="chatInput" placeholder="Escribe un mensaje…" rows="1"></textarea>',
        '      <button class="chat-send-btn" onclick="sendChatMessage()" title="Enviar">&#9658;</button>',
        '    </div>',
        '  </div>',
        '</div>'
    ].join('\n');

    contentArea.appendChild(page);
    renderConversationsList();
    initChatInput();
}

// ── Renderizar lista de conversaciones ──
function renderConversationsList() {
    var list = document.getElementById('conversationsList');
    if (!list) return;
    var convs = [
        { id: 'maria',  badge: 2, time: '10:32', online: true },
        { id: 'laura',  badge: 3, time: '11:58', online: true },
        { id: 'ana',    badge: 1, time: '09:14', online: true },
        { id: 'carlos', badge: 0, time: 'Ayer',  online: false },
        { id: 'jorge',  badge: 0, time: 'Mar',   online: false }
    ];
    list.innerHTML = convs.map(function(c) {
        var d = chatData[c.id];
        var lastMsg = d.messages[d.messages.length - 1];
        var preview = (lastMsg.from === 'agent' ? 'Tú: ' : '') + lastMsg.text;
        return [
            '<div class="conversation-item" data-contact="' + c.id + '" onclick="openChat(\'' + c.id + '\')">',
            '  <div class="conv-avatar">' + d.emoji + '</div>',
            c.online ? '  <div class="conv-online-dot"></div>' : '',
            '  <div class="conv-info">',
            '    <div class="conv-name">' + d.name + '</div>',
            '    <div class="conv-preview">' + preview + '</div>',
            '  </div>',
            '  <div class="conv-meta">',
            '    <span class="conv-time">' + c.time + '</span>',
            c.badge ? '    <span class="conv-badge">' + c.badge + '</span>' : '',
            '  </div>',
            '</div>'
        ].join('\n');
    }).join('\n');
}

// ── Abrir chat ──
window.openChat = function(contactId) {
    var contact = chatData[contactId];
    if (!contact) return;
    activeContactId = contactId;

    document.querySelectorAll('.conversation-item').forEach(function(el) { el.classList.remove('active-chat'); });
    var item = document.querySelector('[data-contact="' + contactId + '"]');
    if (item) item.classList.add('active-chat');

    // Actualizar header
    document.getElementById('chatContactAvatar').textContent = contact.emoji;
    document.getElementById('chatContactName').textContent = contact.name;
    var statusEl = document.getElementById('chatContactStatus');
    statusEl.textContent = contact.statusText;
    statusEl.className = 'chat-contact-status' + (contact.status === 'offline' ? ' offline' : '');
    document.getElementById('chatHeader').style.display = 'flex';

    // Renderizar mensajes
    var emptyState = document.getElementById('chatEmptyState');
    var messagesEl  = document.getElementById('chatMessages');
    var inputArea   = document.getElementById('chatInputArea');
    if (emptyState)  emptyState.style.display  = 'none';
    if (inputArea)   inputArea.style.display   = 'flex';
    if (messagesEl) {
        messagesEl.style.display = 'flex';
        var currentDate = null;
        messagesEl.innerHTML = contact.messages.map(function(msg) {
            var divider = '';
            if (msg.date !== currentDate) {
                currentDate = msg.date;
                divider = '<div class="chat-date-divider"><span>' + msg.date + '</span></div>';
            }
            var cls       = msg.from === 'agent' ? 'outgoing' : 'incoming';
            var timeAlign = msg.from === 'agent' ? '' : ' left';
            return divider +
                '<div class="chat-bubble ' + cls + '">' + msg.text +
                '<div class="bubble-time' + timeAlign + '">' + msg.time + '</div></div>';
        }).join('');
        setTimeout(function() { messagesEl.scrollTop = messagesEl.scrollHeight; }, 60);
    }

    // Limpiar badge
    var badge = document.querySelector('[data-contact="' + contactId + '"] .conv-badge');
    if (badge) badge.style.display = 'none';

    // MOBILE: deslizar chat hacia adentro, ocultar lista
    if (window.innerWidth <= 768) {
        var convPanel  = document.getElementById('conversationsPanel');
        var chatPanelEl = document.getElementById('chatPanel');
        if (convPanel)   convPanel.classList.add('panel-hidden');
        if (chatPanelEl) chatPanelEl.classList.add('panel-visible');
    }
};

// ── Cerrar chat — FIX del bug de back navigation ──
window.closeChat = function() {
    var convPanel   = document.getElementById('conversationsPanel');
    var chatPanelEl = document.getElementById('chatPanel');
    if (convPanel)   convPanel.classList.remove('panel-hidden');
    if (chatPanelEl) chatPanelEl.classList.remove('panel-visible');
    activeContactId = null;
    document.querySelectorAll('.conversation-item').forEach(function(el) { el.classList.remove('active-chat'); });
};

// ── Enviar mensaje ──
window.sendChatMessage = function() {
    var input = document.getElementById('chatInput');
    if (!input || !input.value.trim() || !activeContactId) return;
    var text = input.value.trim();
    input.value = '';
    input.style.height = 'auto';

    var contact = chatData[activeContactId];
    var now = new Date();
    var t = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    contact.messages.push({ from: 'agent', text: text, time: t, date: 'Hoy' });

    var messagesEl = document.getElementById('chatMessages');
    if (messagesEl) {
        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble outgoing';
        bubble.innerHTML = text + '<div class="bubble-time">' + t + '</div>';
        messagesEl.appendChild(bubble);
        setTimeout(function() { messagesEl.scrollTop = messagesEl.scrollHeight; }, 50);
    }
    var previewEl = document.querySelector('[data-contact="' + activeContactId + '"] .conv-preview');
    if (previewEl) previewEl.textContent = 'Tú: ' + text.substring(0, 38) + (text.length > 38 ? '…' : '');
    var timeEl = document.querySelector('[data-contact="' + activeContactId + '"] .conv-time');
    if (timeEl) timeEl.textContent = t;
};

// ── Filtrar conversaciones ──
window.filterConversations = function(query) {
    var q = query.toLowerCase();
    document.querySelectorAll('.conversation-item').forEach(function(item) {
        var name    = (item.querySelector('.conv-name')    || {}).textContent || '';
        var preview = (item.querySelector('.conv-preview') || {}).textContent || '';
        item.style.display = (name.toLowerCase().includes(q) || preview.toLowerCase().includes(q)) ? 'flex' : 'none';
    });
};

// ── Auto-resize textarea + Enter para enviar ──
function initChatInput() {
    var inp = document.getElementById('chatInput');
    if (!inp) return;
    inp.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
    inp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window.sendChatMessage(); }
    });
}

// ── Inicializar al cargar el DOM ──
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectClientsPage);
} else {
    injectClientsPage();
}

})();
