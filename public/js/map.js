document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("coffee-and-books JS imported successfully!");

        function createMarker(location, map, title) {
            new google.maps.Marker({
                position: location,
                map,
                title,
            });
        }

        function createAllMarker(map) {
            axios.get('http://localhost:3000/places')
                .then((res) => res.data)
                .then((places) => {
                    for (let place of places) {
                        console.log(place)
                        const location = {
                            lat: place.location.coordinates[0],
                            lng: place.location.coordinates[1],
                        }
                        createMarker(location, map, place.name)
                    }
                })
                .catch((err) => console.log(err))

        }

        function startMap() {
            let ironhack = {
                lat: 41.3977381,
                lng: 2.190471916,
            };

            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center: ironhack,
            });

            createAllMarker(map)
        }

        startMap()
    },
    false

);







