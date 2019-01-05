// Makes a new HTML card for a reserved parking space
function makeParkingSpaceCard(spaceData) {
    const address = spaceData.address;

    // Setup main card container
    let card = $("<div>").addClass("panel spaceCard");

    // Create header with address
    let header = $("<div>").addClass("panel-heading spaceCard-header")
        .text(address);
    card.append(header);

    // Create card body
    let body = $("<div>").addClass("panel-body");
    card.append(body);

    // Add image to body
    let spaceImg = $("<img>").addClass("spaceCard_img")
        .attr("src",`https://maps.googleapis.com/maps/api/streetview?parameters&size=200x150&fov=50&location=${address}&key=AIzaSyAhgUQXNuEKFFe63FaEUB8KY1la5q44rdk`);
    body.append(spaceImg);

    // Add tags to body
    let tagDiv = $("<div>");
    tagDiv.append( $("<span>").addClass("spaceCard_tag").text(spaceData.spaceSize) );
    tagDiv.append( $("<span>").addClass("spaceCard_tag").text(spaceData.spaceCover) );
    tagDiv.append( $("<span>").addClass("spaceCard_tag").text(`$${spaceData.price.toFixed(2)}`) );
    body.append(tagDiv);

    return card;
}


