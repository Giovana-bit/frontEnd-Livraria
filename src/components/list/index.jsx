import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

function BookList({ books }) {
  return (
    <Grid container spacing={2}>

      {books?.length > 0 ? (
        books.map((book) => (
          <Grid key={book.id} item xs={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={
                  book.coverUrl ||
                  "https://cdn-icons-png.flaticon.com/512/29/29302.png"
                }
                alt="Capa do Livro"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.book_name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Categoria: {book.category?.name || "Sem categoria"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Editora: {book.editor?.name || "Sem editora"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Publicação: {book.publication}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Páginas: {book.pages}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Preço: R$ {book.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>Nenhum livro encontrado.</Typography>
      )}

    </Grid>
  );
}

export default BookList;