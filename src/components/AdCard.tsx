import { type Advert } from '../types/advert'

const API = "https://inai-col1.fishrungames.com";

interface AdCardProps {
    advert: Advert;
}

function AdCard({ advert }: AdCardProps) {
    // Сервер отдаёт путь без домена ("/uploads/abc.jpg"), поэтому домен
    // приклеиваем сами. Картинки может не быть вовсе — тогда ставим заглушку.
    const картинка = advert.image_url
        ? API + advert.image_url
        : "https://placehold.co/600x400?text=Нет+фото";

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <img
                    src={картинка}
                    className="card-img-top"
                    alt={advert.title}
                    style={{ height: 200, objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{advert.title}</h5>
                    <p className="card-text flex-grow-1">{advert.description}</p>
                    <p className="card-text">
                        <strong>{advert.price} сом</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdCard;
