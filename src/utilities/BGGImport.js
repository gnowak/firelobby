export default async function BGGImport(user = "gnowak") {
  const url =
    "https://www.boardgamegeek.com/xmlapi2/collection?username=" + user
  const collection = []
  await fetch(url)
    .then((response) => response.text())
    .then((text) => new window.DOMParser().parseFromString(text, "text/xml"))
    .then((data) =>
      data.querySelectorAll("item").forEach((item) => {
        collection.push({
          id: item.getAttribute("objectid"),
          name: item.querySelector("name").innerHTML,
          thumbnail: item.querySelector("thumbnail").innerHTML,
        })
      })
    )
  return collection
}
