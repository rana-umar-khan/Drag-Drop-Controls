using Drag_Drop_Controls.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Drag_Drop_Controls.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class DragDropController : ControllerBase
	{
		ApplicationDbContext _db;
		public DragDropController(ApplicationDbContext db)
		{
			_db = db;
		}
		[HttpGet]
		public FieldControl[] Get()
		{
			FieldControl[] controls =( from w in _db.FieldControls select w).ToArray();
			return controls;
		}
		[HttpPost]
		public JsonResult Post(FieldControl[] fieldControls)
		{
			for (int i = 0; i < fieldControls.Length; i++)
			{
				var fc = _db.FieldControls.Find(fieldControls[i].Id);
				fc.Height = fieldControls[i].Height;
				fc.Width = fieldControls[i].Width;
				fc.Top = fieldControls[i].Top;
				fc.Left = fieldControls[i].Left;
			}

			return new JsonResult(_db.SaveChanges());
		}

	}
}
