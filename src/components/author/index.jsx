import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditNoteIcon from "@mui/icons-material/EditNote"; 

function Author() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => setOpen(state);

  const menuItems = [
    { text: "Livros", icon: <LibraryBooksIcon />, path: "/books" },
    { text: "Novo", icon: <AddCircleIcon />, path: "/createBooks" },
    { text: "Perfil", icon: <AccountCircleIcon />, path: "/editProfile" },
    { text: "Autor", icon: <EditNoteIcon />, path: "/author" },
  ];

  useEffect(() => {
    async function getAuthor() {
      try {
        const response = await api.get("/author");
        setAuthors(response.data.message || []);
      } catch (error) {
        setError(`Erro ao carregar os dados de autor: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    getAuthor();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url("https://wallpapers.com/images/hd/bookshelf-background-xfix8ihv6dmfjzyu.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
      }}
    >
      {/* NAVBAR */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Cinzel, serif",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Biblioteca da Meia-Noite
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                href={item.path}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#d4a017",
                    transform: "scale(1.05)",
                    transition: "0.3s",
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component="a" href={item.path}>
                  <ListItemIcon sx={{ color: "#d4a017" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* CONTEÚDO */}
      <Box
        sx={{
          height: "calc(100% - 64px)",
          px: { xs: 3, md: 10 },
          py: 5,
          backdropFilter: "brightness(0.6)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Cinzel, serif",
            fontWeight: 500,
            color: "#d4a017",
            mb: 4,
            textAlign: "center",
          }}
        >
          Autores da Biblioteca 🌙
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: "#d4a017" }} />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 900,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 3,
              boxShadow: "0 0 20px rgba(0,0,0,0.6)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {["ID", "Nome", "Nacionalidade", "Data de Nascimento"].map(
                    (header) => (
                      <TableCell
                        key={header}
                        sx={{
                          color: "#d4a017",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: "bold",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {authors.map((author, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(212, 160, 23, 0.15)",
                      },
                    }}
                  >
                    <TableCell sx={{ color: "#fff" }}>{author.id}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{author.name}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {author.nationality}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {author.birthdate
                        ? new Date(author.birthdate).toLocaleDateString("pt-BR")
                        : "Não informado"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default Author;