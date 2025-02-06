import React, { useState, useEffect, useMemo } from "react";
import { getAllPokemonNames, getPokemonImage } from "../../../helpers";
import { SendHorizontal } from "lucide-react";
import './SearchBar.css'

export const SearchBar = ({ onSelectPokemon }) => {
    const [search, setSearch] = useState("");
    const [allPokemon, setAllPokemon] = useState([]);
    const [availablePokemon, setAvailablePokemon] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pokemonImages, setPokemonImages] = useState({});

    useEffect(() => {
        const loadPokemon = async () => {
            const names = await getAllPokemonNames();
            setAllPokemon(names);
            setAvailablePokemon(names);
        };
        loadPokemon();
    }, []);

    const filteredPokemon = useMemo(() => {
        if (search.length < 2) return [];
        return availablePokemon
            .filter(name => name.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 10);
    }, [search, availablePokemon]);

    useEffect(() => {
        const loadImages = async () => {
            const images = {};
            for (const name of filteredPokemon) {
                if (!pokemonImages[name]) {
                    images[name] = await getPokemonImage(name);
                }
            }
            setPokemonImages(prev => ({ ...prev, ...images }));
        };
        loadImages();
    }, [filteredPokemon]);

    const handleSelectPokemon = (name) => {
        const selectedPokemon = name || filteredPokemon[0];
        if (!selectedPokemon) return;

        onSelectPokemon(selectedPokemon); // Llamar a la función pasada desde ClassicGame
        setAvailablePokemon(prev => prev.filter(pokemon => pokemon !== selectedPokemon));
        setSearch("");
        setShowDropdown(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSelectPokemon();
        }
    };

    return (
        <div className="search-container">
            <div className="flex items-center border rounded-md p-2">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowDropdown(e.target.value.length >= 2);
                    }}
                    onFocus={() => search.length >= 2}
                    onKeyDown={handleKeyDown}
                    className="flex-1 p-2 outline-none w-full"
                />
                <button onClick={() => handleSelectPokemon()}>
                    <SendHorizontal className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black" />
                </button>
            </div>

            {showDropdown && filteredPokemon.length > 0 && (
                <ul className="dropdown">
                    {filteredPokemon.map(name => (
                        <li key={name} onClick={() => handleSelectPokemon(name)}
                            className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer capitalize overflow-hidden"
                        >
                            <img
                                src={pokemonImages[name] || "/pokeball.svg"}
                                className="w-10 h-10 object-contain"
                            />
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
