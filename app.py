from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/post', methods=['POST'])
def post_content():
    data = request.get_json()
    content = data.get('content')
    
    if content:
        # Aqui você pode adicionar o conteúdo ao seu banco de dados ou processá-lo conforme necessário.
        # Vou apenas imprimir para este exemplo.
        print(f"Conteúdo recebido: {content}")
        return jsonify({'message': 'Conteúdo postado com sucesso!'})
    else:
        return jsonify({'message': 'O conteúdo não pode estar vazio!'}), 400

if __name__ == '__main__':
    app.run(debug=True)
