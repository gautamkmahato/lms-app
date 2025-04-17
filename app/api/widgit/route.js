export const dynamic = 'force-static';

export async function GET(request) {
  const js = `
    (function () {
      const widgetId = document.currentScript.getAttribute("data-widget-id");

      const chatBubble = document.createElement("div");
      chatBubble.innerHTML = "💬";
      Object.assign(chatBubble.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#4f46e5",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        cursor: "pointer",
        zIndex: "999999",
      });

      const chatBox = document.createElement("div");
      Object.assign(chatBox.style, {
        position: "fixed",
        bottom: "90px",
        right: "20px",
        width: "300px",
        maxHeight: "400px",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        borderRadius: "12px",
        display: "none",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: "999999",
        fontFamily: "Arial, sans-serif",
      });

      const chatHeader = document.createElement("div");
      chatHeader.textContent = "Chat with us!";
      Object.assign(chatHeader.style, {
        background: "#4f46e5",
        color: "#fff",
        padding: "12px",
        fontWeight: "bold",
      });

      const chatMessages = document.createElement("div");
      Object.assign(chatMessages.style, {
        flex: "1",
        padding: "12px",
        overflowY: "auto",
        fontSize: "14px",
      });

      const chatInputWrapper = document.createElement("div");
      Object.assign(chatInputWrapper.style, {
        display: "flex",
        borderTop: "1px solid #eee",
      });

      const chatInput = document.createElement("input");
      Object.assign(chatInput.style, {
        flex: "1",
        border: "none",
        padding: "10px",
        fontSize: "14px",
        outline: "none",
      });
      chatInput.placeholder = "Type a message...";

      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && chatInput.value.trim() !== "") {
          const userMsg = chatInput.value.trim();
          chatInput.value = "";
          addMessage("user", userMsg);
          setTimeout(() => {
            addMessage("bot", \`Echo: \${userMsg}\`);
          }, 500);
        }
      });

      function addMessage(sender, text) {
        const msg = document.createElement("div");
        msg.textContent = text;
        msg.style.marginBottom = "10px";
        msg.style.textAlign = sender === "user" ? "right" : "left";
        msg.style.color = sender === "user" ? "#4f46e5" : "#000";
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      chatInputWrapper.appendChild(chatInput);

      chatBox.appendChild(chatHeader);
      chatBox.appendChild(chatMessages);
      chatBox.appendChild(chatInputWrapper);

      chatBubble.addEventListener("click", () => {
        chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
      });

      document.body.appendChild(chatBubble);
      document.body.appendChild(chatBox);
    })();
  `;

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
