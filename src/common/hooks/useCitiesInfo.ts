import type { CityInfo } from "@/types";
import { useEffect, useState } from "react";
import { http } from "@/utils";
import dayjs from "dayjs";

const CITIES_CACHE_KEY = "meteorbt.citiesinfo_cache";

export default function useCitiesInfo(selectedCountry: string) {
    const [countries, setCountries] = useState<string[]>([]);
    const [cities, setCities] = useState<CityInfo[]>([]);
    const [gettingCitiesInfo, setGettingCitiesInfo] = useState(false);

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        const citiesinfo = getCachedInfo();
        const citiesList = citiesinfo[selectedCountry];
        if (!citiesList) {
            setCities([]);
            return;
        }
        citiesList.sort((a, b) => a.name.localeCompare(b.name));
        setCities(citiesList);
    }, [selectedCountry]);

    async function getInfo() {
        let citiesinfo: { [country: string]: CityInfo[] } = getCachedInfo();
        let countries = Object.keys(citiesinfo);
        if (countries.length < 1) {
            try {
                setGettingCitiesInfo(true);
                const res = await http().get("/citiesinfo/all");
                citiesinfo = res.data.data;
                localStorage.setItem(
                    CITIES_CACHE_KEY,
                    JSON.stringify({
                        data: citiesinfo,
                        expiresAt: dayjs(Date.now()).add(5, "hour").toISOString(),
                    }),
                );
                countries = Object.keys(citiesinfo);
            } catch (err: any) {
                console.error(err.response || err);
                return;
            } finally {
                setGettingCitiesInfo(false);
            }
        }
        setCountries(countries);
    }

    function getCachedInfo(): { [country: string]: CityInfo[] } {
        const data = localStorage.getItem(CITIES_CACHE_KEY);
        if (!data) return {};
        const obj = JSON.parse(data);
        if (!obj || !obj.expiresAt || !obj.data) {
            return {};
        }
        if (dayjs(obj.expiresAt).isBefore(Date.now(), "minute")) {
            return {};
        }
        return obj.data;
    }

    return {
        countries,
        cities,
        gettingCitiesInfo,
    };
}
