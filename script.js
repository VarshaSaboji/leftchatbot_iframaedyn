document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotWindow = document.getElementById("chatbot-window");
  const resizeHandle = document.getElementById("resize-handle");
  const dragHandle = document.getElementById("drag-handle");
  const openLink = document.getElementById("open-google");

  let iframeLoaded = false;

  // Toggle chatbot visibility and embed iframe
  chatbotBtn.addEventListener("click", () => {
    const isHidden = chatbotWindow.style.display === "none";
    chatbotWindow.style.display = isHidden ? "block" : "none";

    if (isHidden && !iframeLoaded) {
      const iframe = document.createElement("iframe");
      // iframe.src = "https://demo.botaiml.com/ibot/ChatBOT/ibot.html";'
      iframe.src = "https://demo.botaiml.com/dev_chatbot";

      iframe.id = "help-frame";
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.width = "100%";
      iframe.style.height = "calc(100% - 70px)";
      iframe.frameBorder = "0";
      chatbotWindow.insertBefore(iframe, openLink);
      iframeLoaded = true;
    }
  });

  // Open in new tab
  openLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(process.env.URL, "_blank");
  });

  // Resizing logic
  let isResizing = false;
  let startX, startY, startWidth, startHeight, startTop;

  resizeHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isResizing = true;
    const rect = chatbotWindow.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startWidth = rect.width;
    startHeight = rect.height;
    startTop = rect.top;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (isResizing) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newWidth = startWidth + dx;
      const newHeight = startHeight - dy;
      const newTop = startTop + dy;

      if (newWidth >= 200) {
        chatbotWindow.style.width = `${newWidth}px`;
      }
      if (newHeight >= 200) {
        chatbotWindow.style.height = `${newHeight}px`;
        chatbotWindow.style.top = `${newTop}px`;
      }
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
    isDragging = false;
    document.body.style.userSelect = "auto";
  });

  //  Dragging logic
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  dragHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    const rect = chatbotWindow.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      chatbotWindow.style.left = `${e.clientX - offsetX}px`;
      chatbotWindow.style.top = `${e.clientY - offsetY}px`;
    }
  });
});
