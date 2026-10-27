import { useEffect, useState } from 'react'
import { type Advert } from './types/advert'
import AdCard from './components/AdCard'
import AdForm from './components/AdForm'

const API = "https://inai-col1.fishrungames.com";

function App() {
    const [adverts, setAdverts] = useState<Advert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const загрузить = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API + "/ads");
            if (!response.ok) {
                throw new Error("Сервер ответил " + response.status);
            }
            const data = await response.json();
            setAdverts(data.items);          // сервер кладёт список в поле items
        } catch (сбой) {
            setError(сбой instanceof Error ? сбой.message : "Не удалось загрузить");
        } finally {
            setLoading(false);
        }
    };

    // Пустой массив в конце значит «выполнить один раз при открытии страницы».
    // Без него загрузка пошла бы на каждой перерисовке и получился бы вечный цикл.
    useEffect(() => {
        загрузить();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="mb-4">Доска объявлений</h1>

            <AdForm onAdded={загрузить} />

            {loading && <p>Загружаю объявления...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && adverts.length === 0 && (
                <p className="text-muted">Объявлений пока нет.</p>
            )}

            <div className="row">
                {adverts.map((advert) => (
                    <AdCard key={advert.id} advert={advert} />
                ))}
            </div>
        </div>
    )
}

export default App;
