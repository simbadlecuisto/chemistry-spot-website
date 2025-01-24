document.addEventListener('DOMContentLoaded', () => {
    const btnRecherche = document.querySelector('.btn-recherche');
    const listeProduits = document.querySelector('.liste-produits');

    // Données de démonstration (à remplacer par une vraie base de données)
    const produitsPharma = [
        {
            nom: "Acétate de Sodium",
            categorie: "Sels",
            formuleBrute: "CH3COONa",
            gradePharma: "USP",
            prixParKg: 25.50,
            pointFusion: 324,
            solubilite: "Très soluble"
        },
        {
            nom: "Éthanol",
            categorie: "Solvants",
            formuleBrute: "C2H5OH", 
            gradePharma: "EP",
            prixParKg: 12.75,
            pointFusion: -114,
            solubilite: "Miscible à l'eau"
        }
        // Ajouter plus de produits...
    ];

    function filtrerProduits() {
        const categorieSelections = Array.from(document.querySelectorAll('select[multiple] option:checked'))
            .map(option => option.value);
        
        const pHMin = document.querySelector('input[type="range"][min="0"][max="14"]').value;
        const pointFusionMin = document.querySelector('input[type="range"][min="0"][max="500"]').value;
        const prixMin = document.querySelector('input[type="range"][min="0"][max="1000"]').value;

        const resultats = produitsPharma.filter(produit => {
            const matchCategorie = categorieSelections.length === 0 || 
                categorieSelections.includes(produit.categorie);
            
            const matchPrix = produit.prixParKg >= prixMin;
            const matchPointFusion = produit.pointFusion >= pointFusionMin;

            return matchCategorie && matchPrix && matchPointFusion;
        });

        afficherResultats(resultats);
    }

    function afficherResultats(resultats) {
        listeProduits.innerHTML = resultats.map(produit => `
            <div class="produit-carte">
                <h3>${produit.nom}</h3>
                <p>Catégorie: ${produit.categorie}</p>
                <p>Formule: ${produit.formuleBrute}</p>
                <p>Grade: ${produit.gradePharma}</p>
                <p>Prix: ${produit.prixParKg} €/kg</p>
            </div>
        `).join('');
    }

    btnRecherche.addEventListener('click', filtrerProduits);
});