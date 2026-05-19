import React, {
  useEffect,
  useState
} from 'react';

import {
  useNavigate
} from 'react-router-dom';

/* =========================
   DASHBOARD
========================= */

export default function AdminDashboard({
  onLogout
}) {

    const navigate = useNavigate();

    const [leads, setLeads] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedLeadId, setSelectedLeadId] = useState(null);
    const openDeleteModal = (id) => {

        setSelectedLeadId(id);

        setShowDeleteModal(true);
    };
  /* =========================
     FETCH LEADS
  ========================= */

  useEffect(() => {

    fetch('/api/leads')

      .then(res => res.json())

      .then(data => {

        console.log(data);

        setLeads(data);

        setLoading(false);
      })

      .catch(err => {

        console.log(err);

        setLoading(false);
      });

  }, []);

 const handleDelete = async () => {

    try {

        const response = await fetch(
            `/api/leads/${selectedLeadId}`,
            {
                method: 'DELETE'
            }
        );

        const data = await response.json();

        if (data.success) {

            setLeads(
                leads.filter(
                    lead => lead.id !== selectedLeadId
                )
            );

            setShowDeleteModal(false);

            setSelectedLeadId(null);
        }

    } catch (error) {

        console.log(error);
    }
};

  return (

    <div style={styles.wrapper}>

      {/* SIDEBAR */}

      <aside style={styles.sidebar}>

        <div style={styles.branding}>
          {/* Elegant Atmos */}
          <img alt="Elegant Atmos" src="https://kevnitserver.com/projects/elegant_builders/elegantatmoslogo.png" style={styles.logo}/>
        </div>

        {/* <div style={styles.subBrand}>
          Maintainer Panel
        </div> */}

        <div style={styles.menuActive}>
          Customer Leads
        </div>
        <button
          onClick={() => {

            onLogout();

            navigate('/admin');
          }}
          style={styles.logoutBtn}
        >
         Logout
        </button>

      </aside>

      {/* MAIN WORKSPACE */}

      <main style={styles.workspace}>

        <div style={styles.pageHeader}>

          <h1 style={styles.pageTitle}>
            Customer Leads
          </h1>

          <div style={styles.badge}>
            {leads.length} Total
          </div>

        </div>

        {
          loading ? (

            <div style={styles.loading}>
              Loading Leads...
            </div>

          ) : (

            <div style={styles.tableWrapper}>

              <table style={styles.table}>

                <thead>

                    <tr>

                        <th style={styles.th}>Name</th>

                        <th style={styles.th}>Phone</th>

                        <th style={styles.th}>Email</th>

                        <th style={styles.th}>Message</th>

                        <th style={styles.th}>Date</th>

                        <th style={styles.th}>Action</th>

                    </tr>

                </thead>

                <tbody>

                  {
                    leads.map((lead) => (

                      <tr
                        key={lead.id}
                      >

                        <td style={styles.td}>
                          {lead.full_name}
                        </td>

                        <td style={styles.td}>
                          {lead.phone}
                        </td>

                        <td style={styles.td}>
                          {lead.email}
                        </td>

                        <td style={styles.td}>
                          {lead.message || '-'}
                        </td>

                        <td style={styles.td}>
                          {
                            new Date(
                              lead.created_at
                            ).toLocaleString()
                          }
                        </td>
                        <td style={styles.td}>

                            <button
                                onClick={() => openDeleteModal(lead.id)}
                                style={styles.deleteBtn}
                                >
                                Delete
                            </button>

                         </td>

                      </tr>
                    ))
                  }

                </tbody>

              </table>

            </div>
          )
        }

      </main>
      {
  showDeleteModal && (

    <div style={styles.modalOverlay}>

      <div style={styles.modalBox}>

        <h3 style={styles.modalTitle}>
          Delete Lead
        </h3>

        <p style={styles.modalText}>
          Are you sure you want to permanently delete this lead?
        </p>

        <div style={styles.modalActions}>

          <button
            onClick={() => setShowDeleteModal(false)}
            style={styles.cancelBtn}
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            style={styles.confirmDeleteBtn}
          >
            Yes, Delete
          </button>

        </div>

      </div>

    </div>
  )
}

    </div>
  );
}

/* =========================
   STYLES
========================= */

const styles = {

  wrapper: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    backgroundColor: '#f7f5ef',
    fontFamily: "'Poppins', sans-serif"
  },

  sidebar: {
    width: '400px',
    backgroundColor: '#5F733C',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  logo: {
    height: '80px',
  },
  branding: {
    color: '#fff',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '5px',
  },

  subBrand: {
    color: '#dfe8cf',
    marginBottom: '40px',
    fontSize: '14px'
  },

  menuActive: {
    backgroundColor: '#3d4f27',
    color: '#fff',
    padding: '14px',
    borderRadius: '10px',
    fontWeight: '600',
    marginBottom: 'auto'
  },

  logoutBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700'
  },

  workspace: {
    flexGrow: 1,
    padding: '40px',
    overflowX: 'auto'
  },

  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },

  pageTitle: {
    fontSize: '32px',
    color: '#1a1a1a',
    margin: 0
  },

  badge: {
    backgroundColor: '#8fa86a',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '999px',
    fontWeight: '700'
  },

  tableWrapper: {
    backgroundColor: '#fff',
    borderRadius: '18px',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },

  th: {
    backgroundColor: '#5F733C',
    color: '#fff',
    padding: '18px',
    textAlign: 'left',
    fontSize: '14px'
  },

  td: {
    padding: '18px',
    borderBottom: '1px solid #edf1e7',
    color: '#1a1a1a',
    fontSize: '14px',
    verticalAlign: 'top'
  },

  loading: {
    color: '#6b7553',
    fontSize: '18px'
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
  },
  modalOverlay: {

    position: "fixed",

    top: 0,

    left: 0,

    width: "100vw",

    height: "100vh",

    backgroundColor: "rgba(0,0,0,0.5)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    zIndex: 999999
},

modalBox: {

    width: "420px",

    backgroundColor: "#fff",

    borderRadius: "14px",

    padding: "30px",

    boxSizing: "border-box",

    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
},

modalTitle: {

    margin: 0,

    marginBottom: "14px",

    fontSize: "24px",

    color: "#1a1a1a",

    fontWeight: "700"
},

modalText: {

    margin: 0,

    marginBottom: "25px",

    color: "#6b7553",

    lineHeight: "1.6"
},

modalActions: {

    display: "flex",

    justifyContent: "flex-end",

    gap: "12px"
},

cancelBtn: {

    padding: "10px 18px",

    border: "1px solid #d1d5db",

    backgroundColor: "#fff",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "600"
},

confirmDeleteBtn: {

    padding: "10px 18px",

    backgroundColor: "#5F733C",

    color: "#fff",

    border: "none",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "600"
},
};