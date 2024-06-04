import React, {useState, useEffect} from 'react';
import axios from 'axios';

function ShortURLsList() {

    const [urls, setUrls] = useState([]);

    useEffect(() => {
      const fetchUrls = async () => {
          try {
              const response = await axios.get('http://localhost:8000/urls');
              setUrls(response.data.urls);
          } catch (error) {
              console.error(error);
          }
      };

      fetchUrls();
  }, [urls]);

  return (
    <div className="flex items-center justify-center min-h-full bg-gradient-to-r from-green-200 to-pink-200">
      <div className="bg-slate-500 p-8 rounded-xl shadow-lg m-28 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-white">Shortened URLs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Long URL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {urls.slice().reverse().map(url => (
        <tr key={url.short_url}>
          <td className="px-6 py-4 whitespace-nowrap">
            <a href={url.short_url} className="text-blue-500 hover:underline">{url.short_url}</a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {url.original_url}
          </td>
        </tr>
      ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShortURLsList;
