import { jsPDF } from "jspdf";

export function generateCartReceipt(cart) {
    const doc = new jsPDF();

    // Constants
    const pageHeight = doc.internal.pageSize.height;
    const marginTop = 20;
    const lineHeight = 8;
    const bottomMargin = 13;
    let currentY = marginTop;

    // Function to check if a new page is needed
    function checkPageOverflow(doc, yPosition) {
        if (yPosition >= pageHeight - bottomMargin) {
            doc.addPage();
            return marginTop;
        }
        return yPosition;
    }

    // Set background color
    doc.setFillColor(255, 255, 255); // White background
    doc.rect(0, 0, 210, 297, 'F'); // Full-page background

    // Add a colored header
    doc.setFillColor(34, 37, 46); // Dark color for header
    doc.rect(0, 0, 210, 40, 'F'); // Header background

    // Add title text
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255); // White text
    doc.text("University superMarket Store", 105, 25, null, null, "center");

    // Add seller information
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Address: 123 Book Street, Knowledge City", 20, 50);
    doc.text("Phone: (123) 456-7890", 20, 60);

    // Add a line separator
    doc.setLineWidth(1);
    doc.setDrawColor(255, 255, 255); // White line
    doc.line(20, 65, 190, 65);

    // Add receipt title
    currentY = 65;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 37, 46); // Dark color
    doc.text("Receipt of Sale", 105, currentY, null, null, "center");

    // Add a horizontal line below the title
    currentY += 4;
    doc.setLineWidth(1);
    doc.setDrawColor(34, 37, 46); // Dark color for line
    doc.line(10, currentY, 190, currentY);

    // Add buyer details
    const startY = currentY + 12;

    // Add buyer label with background color
    currentY = startY;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(240, 240, 240); // Light gray background for buyer section
    doc.rect(15, currentY - 10, 170, 44, 'F'); // Background for buyer info

    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Buyer Information:", 20, currentY);

    // Add buyer details
    doc.setFont("helvetica", "normal");
    doc.text("Name:", 20, currentY + lineHeight);
    doc.text(`${cart.customerName}`, 60, currentY + lineHeight);

    currentY += 3 * lineHeight;

    currentY = checkPageOverflow(doc, currentY);

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200); // Light gray line
    doc.line(20, currentY, 190, currentY);

    // Add cart details section
    currentY += 2;
    currentY = checkPageOverflow(doc, currentY);
    doc.setFillColor(34, 37, 46); // Dark color for cart section
    doc.rect(15, currentY - 10, 170, 15, 'F'); // Background for cart section

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255); // White text
    doc.text("Products Purchased:", 20, currentY);

    currentY += 1 * lineHeight;
    currentY = checkPageOverflow(doc, currentY);

    let totalPrice = 0;

    // Iterate through each product in the cart
    cart.cartProducts.forEach((product, index) => {
        currentY = checkPageOverflow(doc, currentY + 1 * lineHeight);
        
        // Add light gray background for each product's details
        doc.setFillColor(240, 240, 240); // Light gray background
        doc.rect(15, currentY - lineHeight, 190, 4 * lineHeight, 'F');  // Increase background height // Background for product details
    
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0); // Black text
        doc.text(`Product ${index + 1}:`, 20, currentY);
    
        doc.setFont("helvetica", "normal");
        doc.text(`Name: ${product.name}`, 60, currentY);
        doc.text(`Price: ${product.price} RS`, 60, currentY + lineHeight);
        doc.text(`Quantity: ${product.stock}`, 60, currentY + 2 * lineHeight);
        doc.text(`Total Price: ${product.totalPrice} RS`, 60, currentY + 3 * lineHeight);
    
        // Move to the next line for the next product
        currentY += 4 * lineHeight; // Adjusting space between products
    });

    // Add total price
    currentY = checkPageOverflow(doc, currentY + lineHeight);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Total Price:", 20, currentY);
    doc.setFont("helvetica", "normal");
    doc.text(`${cart.totalPrice} RS`, 50, currentY);

    currentY += lineHeight;
    currentY = checkPageOverflow(doc, currentY);
    
    doc.setFont("helvetica", "bold");
    doc.text("Sign/Stamp", 160, currentY);

    // Add a footer with a line and thank you note
    currentY += lineHeight;
    currentY = checkPageOverflow(doc, currentY);
    
    doc.setLineWidth(1);
    doc.setDrawColor(34, 37, 46); // Dark color for line
    doc.line(15, currentY, 190, currentY);

    currentY += lineHeight;
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(0, 0, 0); // Black text
    doc.text("Thank you for your purchase from University Book Store!", 105, currentY, null, null, "center");

    // Generate the PDF as a Blob
    const pdfBlob = doc.output("blob");

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create an iframe to load the PDF
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.src = pdfUrl;

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Try to open the print dialog
    try {
        iframe.onload = function() {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
    } catch (error) {
        // Print failed, fallback to download
        console.log(error, "pdf");
        document.body.removeChild(iframe);
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfUrl;
        downloadLink.download = `receipt_${cart.customerName}.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
