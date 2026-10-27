import { useState } from 'react'

const API = "https://inai-col1.fishrungames.com";

interface AdFormProps {
    onAdded: () => void;       // чем сообщить родителю, что объявление добавлено
}

function AdForm({ onAdded }: AdFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError(null);

        try {
            // FormData нужна, потому что вместе с текстом уходит файл.
            // Content-Type вручную НЕ ставим: браузер добавит его сам
            // вместе с boundary, без которого сервер не разберёт запрос.
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch(API + "/ads", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Сервер ответил " + response.status);
            }

            setTitle("");
            setDescription("");
            setPrice("");
            setImage(null);
            (e.target as HTMLFormElement).reset();   // очищаем поле файла
            onAdded();                               // просим родителя перечитать список
        } catch (сбой) {
            setError(сбой instanceof Error ? сбой.message : "Не удалось отправить");
        } finally {
            setSending(false);
        }
    };

    return (
        <form className="card card-body mb-5" onSubmit={handleSubmit}>
            <h2 className="h4 mb-3">Подать объявление</h2>

            <div className="mb-3">
                <label className="form-label">Заголовок</label>
                <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Описание</label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Цена</label>
                <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Фото</label>
                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? "Отправляю..." : "Опубликовать"}
            </button>
        </form>
    )
}

export default AdForm;
